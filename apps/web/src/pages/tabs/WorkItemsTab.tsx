import { useMemo, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import type { WorkItem } from "../../loaders";

type LoaderData = { statuses: string[]; items: WorkItem[] };

function dateInputValue(iso: string | null) {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export function WorkItemsTab() {
  const { statuses, items } = useLoaderData() as LoaderData;
  const revalidator = useRevalidator();

  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sorted = useMemo(() => items, [items]);

  async function save(item: WorkItem, patch: any) {
    setSavingId(item.id);
    setError(null);
    try {
      await api(endpoints.patchWorkItem(item.id), "PATCH", patch);
      revalidator.revalidate();
    } catch (e: any) {
      setError(e?.message ?? "Falha ao salvar");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Work Items</h3>
      {error ? <div style={{ color: "#f87171", marginBottom: 10 }}>{error}</div> : null}

      <div style={{ display: "grid", gap: 8 }}>
        {sorted.map((it) => (
          <div key={it.id} style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 800 }}>
                  {it.title}{" "}
                  {it.isCritical ? <span style={{ opacity: 0.85 }}>• CRITICO</span> : null}
                </div>
                <div style={{ opacity: 0.75, marginTop: 4 }}>
                  {it.type} • status: <b>{it.status}</b>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <select
                  defaultValue={it.status}
                  onChange={(e) => save(it, { status: e.target.value })}
                  disabled={savingId === it.id}
                  style={{ padding: 8, borderRadius: 10, border: "1px solid #2a2a2a" }}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <input
                  type="date"
                  defaultValue={dateInputValue(it.startDate)}
                  onBlur={(e) => save(it, { startDate: e.target.value || null })}
                  disabled={savingId === it.id}
                  style={{ padding: 8, borderRadius: 10, border: "1px solid #2a2a2a" }}
                />

                <input
                  type="date"
                  defaultValue={dateInputValue(it.dueDate)}
                  onBlur={(e) => save(it, { dueDate: e.target.value || null })}
                  disabled={savingId === it.id}
                  style={{ padding: 8, borderRadius: 10, border: "1px solid #2a2a2a" }}
                />
              </div>
            </div>

            {savingId === it.id ? <div style={{ opacity: 0.7, marginTop: 6 }}>Salvando...</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

