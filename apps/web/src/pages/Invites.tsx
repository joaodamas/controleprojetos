import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { WorkspaceDTO } from "../loaders";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

type InviteRow = {
  id: string;
  email: string;
  role: string;
  status: string;
  expiresAt: string;
  createdAt: string;
  inviteUrl?: string;
};

export function Invites() {
  const ws = useLoaderData() as WorkspaceDTO;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [rows, setRows] = useState<InviteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const data = await api<{ invites: InviteRow[] }>(
        endpoints.workspaceInvites(ws.id),
        "GET"
      );
      setRows(data.invites);
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao carregar convites");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.id]);

  async function createInvite() {
    setSaving(true);
    setErr(null);
    try {
      const created = await api<any>(
        endpoints.createWorkspaceInvite(ws.id),
        "POST",
        { email, role }
      );
      setEmail("");
      if (created?.inviteUrl) {
        alert(`SMTP nao configurado. Copie o link:\n\n${created.inviteUrl}`);
      }
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao criar convite");
    } finally {
      setSaving(false);
    }
  }

  async function revoke(inviteId: string) {
    setErr(null);
    try {
      await api(endpoints.revokeWorkspaceInvite(ws.id, inviteId), "POST");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao revogar");
    }
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Convites</h2>
      {err ? <div style={{ color: "#f87171", marginBottom: 10 }}>{err}</div> : null}

      <div style={{ border: "1px solid #2a2a2a", borderRadius: 12, padding: 12, maxWidth: 560 }}>
        <div style={{ fontWeight: 800 }}>Convidar por e-mail</div>

        <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@empresa.com"
            style={{ padding: 10, borderRadius: 10, border: "1px solid #2a2a2a", flex: 1, minWidth: 240 }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #2a2a2a" }}
          >
            <option value="viewer">viewer</option>
            <option value="member">member</option>
            <option value="manager">manager</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button
          onClick={createInvite}
          disabled={saving}
          style={{
            marginTop: 10,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #2a2a2a",
            cursor: "pointer"
          }}
        >
          {saving ? "Enviando..." : "Enviar convite"}
        </button>

        <div style={{ opacity: 0.7, marginTop: 8 }}>
          Se SMTP nao estiver configurado, o backend devolve um link para copiar (dev).
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Pendentes / Historico</div>
        {loading ? (
          <div style={{ opacity: 0.8 }}>Carregando...</div>
        ) : rows.length === 0 ? (
          <div style={{ opacity: 0.8 }}>Sem convites.</div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {rows.map((r) => (
              <div
                key={r.id}
                style={{
                  border: "1px solid #2a2a2a",
                  borderRadius: 12,
                  padding: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12
                }}
              >
                <div>
                  <div style={{ fontWeight: 800 }}>
                    {r.email} ? {r.role}
                  </div>
                  <div style={{ opacity: 0.75, marginTop: 4 }}>
                    status: {r.status} ? expira: {String(r.expiresAt).slice(0, 10)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {r.status === "pending" ? (
                    <button
                      onClick={() => revoke(r.id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #2a2a2a",
                        cursor: "pointer",
                        height: 36
                      }}
                    >
                      Revogar
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
