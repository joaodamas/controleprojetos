import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";

type Intervention = {
  id: string;
  title: string;
  status: string;
  ownerUserId: string | null;
  dueDate: string | null;
  updatedAt: string;
  evidenceNote?: string | null;
};

export function InterventionsTab() {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Intervention[]>([]);
  const [noteById, setNoteById] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api<{ interventions: Intervention[] }>(
        endpoints.projectInterventions(projectId!),
        "GET"
      );
      setRows(data.interventions);
      const map: Record<string, string> = {};
      for (const it of data.interventions) map[it.id] = (it.evidenceNote ?? "") as string;
      setNoteById(map);
    } catch (e: any) {
      setError(e?.message ?? "Falha ao carregar intervencoes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [projectId]);

  async function finalize(it: Intervention) {
    setSavingId(it.id);
    setError(null);
    try {
      await api(endpoints.patchIntervention(it.id), "PATCH", {
        status: "done",
        evidenceNote: (noteById[it.id] ?? "").trim()
      });
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Falha ao finalizar");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Intervencoes</h3>
      {error ? <div style={{ color: "#f87171", marginBottom: 10 }}>{error}</div> : null}

      {loading ? (
        <p style={{ opacity: 0.8 }}>Carregando...</p>
      ) : rows.length === 0 ? (
        <p style={{ opacity: 0.8 }}>Sem intervencoes.</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {rows.map((it) => (
            <div key={it.id} style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{it.title}</div>
                  <div style={{ opacity: 0.75, marginTop: 4 }}>
                    owner: {it.ownerUserId ?? "-"} | due: {it.dueDate ? it.dueDate.slice(0, 10) : "-"}
                  </div>

                  <textarea
                    value={noteById[it.id] ?? ""}
                    onChange={(e) => setNoteById((p) => ({ ...p, [it.id]: e.target.value }))}
                    rows={3}
                    placeholder="Evidencia (min. 10 caracteres para finalizar)"
                    style={{
                      width: "100%",
                      marginTop: 10,
                      padding: 10,
                      borderRadius: 10,
                      border: "1px solid #2a2a2a"
                    }}
                    disabled={savingId === it.id}
                  />

                  <button
                    onClick={() => finalize(it)}
                    disabled={savingId === it.id || it.status === "done"}
                    style={{
                      marginTop: 10,
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #2a2a2a",
                      cursor: "pointer"
                    }}
                  >
                    {savingId === it.id ? "Salvando..." : it.status === "done" ? "Finalizada" : "Finalizar"}
                  </button>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800 }}>{it.status}</div>
                  <div style={{ opacity: 0.75 }}>{new Date(it.updatedAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
