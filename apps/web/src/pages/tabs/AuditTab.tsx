import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";

type AuditEvent = {
  id: string;
  createdAt: string;
  actorUserId: string;
  type: string;
  payloadJson: any;
};

export function AuditTab() {
  const { projectId } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [nextBefore, setNextBefore] = useState<string | null>(null);

  const [type, setType] = useState("");
  const [actorUserId, setActorUserId] = useState("");
  const [pretty, setPretty] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const qsBase = useMemo(() => {
    const p = new URLSearchParams();
    p.set("limit", "100");
    if (type.trim()) p.set("type", type.trim());
    if (actorUserId.trim()) p.set("actorUserId", actorUserId.trim());
    return p;
  }, [type, actorUserId]);

  async function loadFirst() {
    if (!projectId) return;
    setLoading(true);
    setErr(null);
    try {
      const qs = new URLSearchParams(qsBase);
      const data = await api<{ events: AuditEvent[]; nextBefore: string | null }>(
        `${endpoints.projectAuditEvents(projectId)}?${qs.toString()}`,
        "GET"
      );
      setEvents(data.events);
      setNextBefore(data.nextBefore);
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao carregar auditoria");
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (!projectId || !nextBefore) return;
    setErr(null);
    try {
      const qs = new URLSearchParams(qsBase);
      qs.set("before", nextBefore);

      const data = await api<{ events: AuditEvent[]; nextBefore: string | null }>(
        `${endpoints.projectAuditEvents(projectId)}?${qs.toString()}`,
        "GET"
      );

      setEvents((prev) => [...prev, ...data.events]);
      setNextBefore(data.nextBefore);
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao carregar mais");
    }
  }

  useEffect(() => {
    void loadFirst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Auditoria</h3>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ opacity: 0.7 }}>Type</span>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="ex: work_item_patch"
            style={{ padding: 8, borderRadius: 10, border: "1px solid #2a2a2a", minWidth: 220 }}
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ opacity: 0.7 }}>Actor</span>
          <input
            value={actorUserId}
            onChange={(e) => setActorUserId(e.target.value)}
            placeholder="userId"
            style={{ padding: 8, borderRadius: 10, border: "1px solid #2a2a2a", minWidth: 220 }}
          />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "end" }}>
          <input
            type="checkbox"
            checked={pretty}
            onChange={(e) => setPretty(e.target.checked)}
          />
          <span style={{ opacity: 0.8 }}>Pretty JSON</span>
        </label>

        <button
          onClick={loadFirst}
          style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer", height: 40 }}
        >
          Aplicar filtros
        </button>
      </div>

      {err ? <div style={{ color: "#f87171", marginBottom: 10 }}>{err}</div> : null}

      {loading ? (
        <div style={{ opacity: 0.8 }}>Carregando...</div>
      ) : events.length === 0 ? (
        <div style={{ opacity: 0.8 }}>Sem eventos.</div>
      ) : (
        <>
          <div style={{ display: "grid", gap: 10 }}>
            {events.map((ev) => {
              const isExpanded = expandedId === ev.id;
              const payloadStr = ev.payloadJson
                ? JSON.stringify(ev.payloadJson, null, pretty ? 2 : 0)
                : "";

              return (
                <div key={ev.id} style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{ev.type}</div>
                      <div style={{ opacity: 0.75, marginTop: 4 }}>
                        {new Date(ev.createdAt).toLocaleString()} • actor: {ev.actorUserId}
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ev.id)}
                      style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer", height: 36 }}
                    >
                      {isExpanded ? "Fechar" : "Ver payload"}
                    </button>
                  </div>

                  {isExpanded ? (
                    <pre
                      style={{
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                        border: "1px solid #2a2a2a",
                        overflow: "auto",
                        maxHeight: 320,
                        opacity: 0.9,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word"
                      }}
                    >
                      {payloadStr || "(sem payload)"}
                    </pre>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 12 }}>
            <button
              onClick={loadMore}
              disabled={!nextBefore}
              style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer" }}
            >
              {nextBefore ? "Carregar mais" : "Fim"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
