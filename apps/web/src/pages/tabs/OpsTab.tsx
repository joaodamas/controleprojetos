import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";

type Run = {
  id: string;
  createdAt: string;
  reason: string;
  durationMs: number;
  candidates: number;
  upserted: number;
  resolved: number;
  high: number;
};

export function OpsTab() {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    (async () => {
      if (!projectId) return;
      setLoading(true);
      setErr(null);
      try {
        const data = await api<{ runs: Run[] }>(`${endpoints.projectRecomputeRuns(projectId)}?limit=50`, "GET");
        setRuns(data.runs);
      } catch (e: any) {
        setErr(e?.message ?? "Falha ao carregar runs");
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId]);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Ops (Recompute)</h3>
      {err ? <div style={{ color: "#f87171", marginBottom: 10 }}>{err}</div> : null}

      {loading ? (
        <div style={{ opacity: 0.8 }}>Carregando...</div>
      ) : runs.length === 0 ? (
        <div style={{ opacity: 0.8 }}>Sem runs.</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {runs.map((r) => (
            <div key={r.id} style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{r.reason}</div>
                  <div style={{ opacity: 0.75, marginTop: 4 }}>{new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: "right", opacity: 0.9 }}>
                  <div>dur: <b>{r.durationMs}ms</b></div>
                  <div>cand: {r.candidates} • up: {r.upserted} • res: {r.resolved}</div>
                  <div>HIGH: <b>{r.high}</b></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
