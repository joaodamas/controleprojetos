import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

type InboxIntervention = {
  id: string;
  title: string;
  status: string;
  ownerUserId: string | null;
  dueDate: string | null;
  updatedAt: string;
  project: { id: string; name: string } | null;
};

export function Inbox() {
  const { workspaceId } = useParams();
  const [scope, setScope] = useState<"mine" | "workspace">("workspace");
  const [statusFilter, setStatusFilter] = useState<"open" | "open_in_progress" | "all">("open_in_progress");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<InboxIntervention[]>([]);
  const [noteById, setNoteById] = useState<Record<string, string>>({});

  const statusParam = useMemo(() => {
    if (statusFilter === "open") return "open";
    if (statusFilter === "all") return "open,in_progress,done,canceled";
    return "open,in_progress";
  }, [statusFilter]);

  async function load() {
    if (!workspaceId) return;
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        workspaceId,
        scope,
        status: statusParam,
        limit: "100"
      });

      const data = await api<{ interventions: InboxIntervention[] }>(
        `${endpoints.inboxInterventions()}?${query.toString()}`,
        "GET"
      );

      setRows(data.interventions);

      const nextNotes: Record<string, string> = {};
      for (const it of data.interventions) nextNotes[it.id] = noteById[it.id] ?? "";
      setNoteById(nextNotes);
    } catch (e: any) {
      setError(e?.message ?? "Falha ao carregar inbox");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, scope, statusFilter]);

  async function assume(it: InboxIntervention) {
    setSavingId(it.id);
    setError(null);
    try {
      await api(endpoints.patchIntervention(it.id), "PATCH", { status: "in_progress" });
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Falha ao assumir");
    } finally {
      setSavingId(null);
    }
  }

  async function finish(it: InboxIntervention) {
    const note = (noteById[it.id] ?? "").trim();
    setSavingId(it.id);
    setError(null);
    try {
      await api(endpoints.patchIntervention(it.id), "PATCH", { status: "done", evidenceNote: note });
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Falha ao finalizar");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Inbox</h2>
      {error ? <div style={{ color: "#f87171", marginBottom: 10 }}>{error}</div> : null}

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ opacity: 0.7 }}>Escopo</span>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value as "mine" | "workspace")}
            style={{ padding: 8, borderRadius: 10, border: "1px solid #2a2a2a" }}
          >
            <option value="workspace">Workspace</option>
            <option value="mine">Meu</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ opacity: 0.7 }}>Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "open" | "open_in_progress" | "all")}
            style={{ padding: 8, borderRadius: 10, border: "1px solid #2a2a2a" }}
          >
            <option value="open_in_progress">Open + In Progress</option>
            <option value="open">Open</option>
            <option value="all">Todos</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div style={{ opacity: 0.8 }}>Carregando...</div>
      ) : rows.length === 0 ? (
        <div style={{ opacity: 0.8 }}>Inbox vazia.</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {rows.map((it) => {
            const note = noteById[it.id] ?? "";
            const canFinish = note.trim().length >= 10;
            const disabled = savingId === it.id;

            return (
              <div
                key={it.id}
                style={{
                  border: "1px solid #2a2a2a",
                  borderRadius: 12,
                  padding: 12
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800 }}>{it.title}</div>
                    <div style={{ opacity: 0.75, marginTop: 4 }}>
                      status: {it.status} • due: {it.dueDate ? it.dueDate.slice(0, 10) : "-"} • owner: {it.ownerUserId ?? "-"}
                    </div>

                    {it.project ? (
                      <Link
                        to={`/w/${workspaceId}/projects/${it.project.id}`}
                        style={{ display: "inline-block", marginTop: 6 }}
                      >
                        {it.project.name}
                      </Link>
                    ) : null}

                    {it.status !== "done" ? (
                      <>
                        <textarea
                          value={note}
                          onChange={(e) => setNoteById((p) => ({ ...p, [it.id]: e.target.value }))}
                          rows={3}
                          placeholder="Evidencia (min. 10 chars pra finalizar)"
                          style={{
                            width: "100%",
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 10,
                            border: "1px solid #2a2a2a"
                          }}
                          disabled={disabled}
                        />

                        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                          <button
                            onClick={() => assume(it)}
                            disabled={disabled || it.status !== "open"}
                            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer" }}
                          >
                            {disabled ? "..." : "Assumir"}
                          </button>

                          <button
                            onClick={() => finish(it)}
                            disabled={disabled || !canFinish}
                            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer" }}
                          >
                            {disabled ? "..." : "Finalizar"}
                          </button>

                          {!canFinish ? <span style={{ opacity: 0.65, alignSelf: "center" }}>Falta evidencia.</span> : null}
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div style={{ textAlign: "right", opacity: 0.75 }}>
                    {new Date(it.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
