import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";

type BaselineRow = {
  id: string;
  createdAt: string;
  label: string | null;
  summaryJson: any;
};

type BaselineDiff = {
  baselineActiveId: string | null;
  slipsCritical: Array<{
    workItemId: string;
    title: string;
    baselineDue: string;
    currentDue: string;
    slipDays: number;
  }>;
  overdueCritical: Array<{
    workItemId: string;
    title: string;
    dueDate: string;
    daysOverdue: number;
  }>;
};

export function BaselinesTab() {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [baselineActiveId, setBaselineActiveId] = useState<string | null>(null);
  const [rows, setRows] = useState<BaselineRow[]>([]);
  const [diff, setDiff] = useState<BaselineDiff | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api<{ baselineActiveId: string | null; baselines: BaselineRow[] }>(
        endpoints.projectBaselines(projectId!),
        "GET"
      );
      setBaselineActiveId(data.baselineActiveId);
      setRows(data.baselines);

      const diffData = await api<BaselineDiff>(endpoints.projectBaselineDiff(projectId!), "GET");
      setDiff(diffData);
    } catch (e: any) {
      setError(e?.message ?? "Falha ao carregar baselines");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  async function createBaseline() {
    setCreating(true);
    setError(null);
    try {
      await api(endpoints.createBaseline(projectId!), "POST", { label: null });
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Falha ao criar baseline");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Baselines</h3>
      {error ? <div style={{ color: "#f87171", marginBottom: 10 }}>{error}</div> : null}

      <button
        onClick={createBaseline}
        disabled={creating || loading}
        style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer" }}
      >
        {creating ? "Criando..." : "Criar baseline"}
      </button>

      {loading ? (
        <p style={{ opacity: 0.8, marginTop: 12 }}>Carregando...</p>
      ) : rows.length === 0 ? (
        <p style={{ opacity: 0.8, marginTop: 12 }}>Nenhuma baseline.</p>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {rows.map((b) => (
            <div key={b.id} style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800 }}>
                    {b.id === baselineActiveId ? "ATIVA - " : ""}
                    {b.label ?? "Baseline"}
                  </div>
                  <div style={{ opacity: 0.75, marginTop: 4 }}>
                    {new Date(b.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: "right", opacity: 0.85 }}>
                  <div>Total: {b.summaryJson?.total ?? "-"}</div>
                  <div>Milestones: {b.summaryJson?.milestones ?? "-"}</div>
                  <div>Criticos: {b.summaryJson?.criticalMilestones ?? "-"}</div>
                  <div>Overdue: {b.summaryJson?.overdueCriticalMilestones ?? "-"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {diff && diff.baselineActiveId ? (
        <div style={{ marginTop: 18 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Piorou desde baseline</div>

          {diff.slipsCritical.length === 0 && diff.overdueCritical.length === 0 ? (
            <div style={{ opacity: 0.8 }}>Sem regressao nos criticos.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {diff.slipsCritical.length > 0 ? (
                <div style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>Slips criticos</div>
                  {diff.slipsCritical.map((row) => (
                    <div key={row.workItemId} style={{ opacity: 0.85, marginTop: 6 }}>
                      {row.title}: {row.baselineDue} -> {row.currentDue} (+{row.slipDays}d)
                    </div>
                  ))}
                </div>
              ) : null}

              {diff.overdueCritical.length > 0 ? (
                <div style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>Criticos overdue</div>
                  {diff.overdueCritical.map((row) => (
                    <div key={row.workItemId} style={{ opacity: 0.85, marginTop: 6 }}>
                      {row.title}: {row.dueDate} ({row.daysOverdue}d atraso)
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
