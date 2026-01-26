import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";

type Risk = {
  id: string;
  ruleId: string;
  targetKey: string;
  severity: string;
  status: string;
  explanation: string;
  createdAt: string;
};

export function RisksTab() {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Risk[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api<{ risks: Risk[] }>(endpoints.projectRisks(projectId!), "GET");
        setRows(data.risks);
      } catch (e: any) {
        setError(e?.message ?? "Falha ao carregar riscos");
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId]);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Riscos</h3>
      {error ? <div style={{ color: "#f87171", marginBottom: 10 }}>{error}</div> : null}

      {loading ? (
        <p style={{ opacity: 0.8 }}>Carregando...</p>
      ) : rows.length === 0 ? (
        <p style={{ opacity: 0.8 }}>Sem riscos.</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {rows.map((r) => (
            <div key={r.id} style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{r.ruleId}</div>
                  <div style={{ opacity: 0.75, marginTop: 4 }}>{r.explanation}</div>
                  <div style={{ opacity: 0.65, marginTop: 6 }}>target: {r.targetKey}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800 }}>{r.severity.toUpperCase()}</div>
                  <div style={{ opacity: 0.8 }}>{r.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}