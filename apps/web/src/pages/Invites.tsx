import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { WorkspaceDTO } from "../loaders";
import { ApiError, api, getAuthToken } from "../api/client";
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

type MemberRow = {
  userId: string;
  email: string | null;
  name: string | null;
  role: string;
  status: string;
  createdAt: string;
};

type MemberRole = "owner" | "admin" | "manager" | "member" | "viewer";
const ROLE_HINTS: Record<MemberRole, string> = {
  owner: "Pode tudo. Responsavel final pelo workspace.",
  admin: "Pode convidar, remover membros e configurar.",
  manager: "Pode gerir projetos e itens.",
  member: "Pode colaborar nos itens.",
  viewer: "Somente leitura."
};
const ROLE_LABELS: Record<MemberRole, string> = {
  owner: "Owner",
  admin: "Admin",
  manager: "Manager",
  member: "Member",
  viewer: "Viewer"
};

export function Invites() {
  const ws = useLoaderData() as WorkspaceDTO;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [rows, setRows] = useState<InviteRow[]>([]);
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [membersErr, setMembersErr] = useState<string | null>(null);
  const [invitesErr, setInvitesErr] = useState<string | null>(null);
  const [memberUpdating, setMemberUpdating] = useState<Record<string, boolean>>({});
  const [memberRemoving, setMemberRemoving] = useState<Record<string, boolean>>({});

  const canManageMembers = ws.userRole === "owner" || ws.userRole === "admin";

  const getCurrentUserId = () => {
    const token = getAuthToken();
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    try {
      const raw = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = raw + "===".slice((raw.length + 3) % 4);
      const payload = JSON.parse(atob(padded));
      return typeof payload?.sub === "string" ? payload.sub : null;
    } catch {
      return null;
    }
  };

  const currentUserId = getCurrentUserId();

  async function loadInvites() {
    setLoading(true);
    setErr(null);
    setInvitesErr(null);
    try {
      const data = await api<{ invites: InviteRow[] }>(
        endpoints.workspaceInvitesByStatus(ws.id, "pending"),
        "GET"
      );
      setRows(data.invites);
    } catch (e: any) {
      const message =
        e instanceof ApiError && e.status === 403
          ? "Voce nao tem permissao para ver convites deste workspace."
          : e?.message ?? "Falha ao carregar convites";
      setErr(message);
      setInvitesErr(message);
    } finally {
      setLoading(false);
    }
  }

  async function loadMembers() {
    setMembersLoading(true);
    setErr(null);
    setMembersErr(null);
    try {
      const data = await api<{ members: MemberRow[] }>(
        endpoints.workspaceMembers(ws.id),
        "GET"
      );
      setMembers(data.members);
    } catch (e: any) {
      const message =
        e instanceof ApiError && e.status === 403
          ? "Voce nao tem permissao para ver membros deste workspace."
          : e?.message ?? "Falha ao carregar membros";
      setErr(message);
      setMembersErr(message);
    } finally {
      setMembersLoading(false);
    }
  }

  useEffect(() => {
    void loadInvites();
    void loadMembers();
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
      await loadInvites();
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
      await loadInvites();
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao revogar");
    }
  }

  const displayMemberName = (m: MemberRow) => m.name ?? m.email ?? m.userId;

  async function updateMemberRole(userId: string, nextRole: MemberRole) {
    setMembersErr(null);
    setMemberUpdating((prev) => ({ ...prev, [userId]: true }));
    try {
      await api(endpoints.patchWorkspaceMember(ws.id, userId), "PATCH", {
        role: nextRole
      });
      setMembers((prev) =>
        prev.map((m) => (m.userId === userId ? { ...m, role: nextRole } : m))
      );
    } catch (e: any) {
      const message =
        e instanceof ApiError && e.status === 409
          ? "Nao e possivel alterar o ultimo owner. Defina outro owner antes de rebaixar."
          : e?.message ?? "Falha ao atualizar role";
      setMembersErr(message);
    } finally {
      setMemberUpdating((prev) => ({ ...prev, [userId]: false }));
    }
  }

  async function removeMember(userId: string) {
    const confirmed = window.confirm("Tem certeza que deseja remover este membro do workspace?");
    if (!confirmed) return;
    setMembersErr(null);
    setMemberRemoving((prev) => ({ ...prev, [userId]: true }));
    try {
      await api(endpoints.deleteWorkspaceMember(ws.id, userId), "DELETE");
      setMembers((prev) => prev.filter((m) => m.userId !== userId));
    } catch (e: any) {
      const message =
        e instanceof ApiError && e.status === 409
          ? "Nao e possivel remover o ultimo owner. Defina outro owner antes de remover."
          : e?.message ?? "Falha ao remover membro";
      setMembersErr(message);
    } finally {
      setMemberRemoving((prev) => ({ ...prev, [userId]: false }));
    }
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Usuarios</h2>
      {err ? <div style={{ color: "#f87171", marginBottom: 10 }}>{err}</div> : null}

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Membros</div>
        {membersErr ? (
          <div style={{ color: "#f87171", marginBottom: 10 }}>
            {membersErr}{" "}
            <button
              onClick={loadMembers}
              style={{
                marginLeft: 8,
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid #2a2a2a",
                cursor: "pointer"
              }}
            >
              Tentar novamente
            </button>
          </div>
        ) : null}
        {membersLoading ? (
          <div style={{ opacity: 0.8 }}>Carregando membros...</div>
        ) : members.length <= 1 ? (
          <div style={{ opacity: 0.8 }}>Sem membros alem de voce.</div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {members.map((m) => (
              <div
                key={`member-${m.userId}`}
                style={{
                  border: "1px solid #2a2a2a",
                  borderRadius: 12,
                  padding: 12,
                  display: "grid",
                  gap: 10
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{displayMemberName(m)}</div>
                    <div style={{ opacity: 0.75, marginTop: 4 }}>
                      role: {ROLE_LABELS[m.role as MemberRole] ?? m.role} ? status: {m.status}
                    </div>
                  </div>
                  <div style={{ opacity: 0.6, fontSize: 12 }}>
                    entrou: {String(m.createdAt).slice(0, 10)}
                  </div>
                </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                <select
                  value={m.role}
                  onChange={(e) => updateMemberRole(m.userId, e.target.value as MemberRole)}
                  disabled={!canManageMembers || m.userId === currentUserId || memberUpdating[m.userId]}
                  style={{ padding: 8, borderRadius: 10, border: "1px solid #2a2a2a" }}
                  title={ROLE_HINTS[m.role as MemberRole] ?? ""}
                >
                  <option value="owner">owner</option>
                  <option value="admin">admin</option>
                  <option value="manager">manager</option>
                  <option value="member">member</option>
                  <option value="viewer">viewer</option>
                </select>
                <span
                  title={ROLE_HINTS[m.role as MemberRole] ?? ""}
                  style={{
                    padding: "4px 8px",
                    borderRadius: 999,
                    border: "1px solid #2a2a2a",
                    fontSize: 12,
                    opacity: 0.8
                  }}
                >
                  {ROLE_LABELS[m.role as MemberRole] ?? m.role}
                </span>
                <button
                  onClick={() => removeMember(m.userId)}
                  disabled={!canManageMembers || m.userId === currentUserId || memberRemoving[m.userId]}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #2a2a2a",
                    cursor: "pointer"
                  }}
                >
                  Remover
                </button>
                {memberUpdating[m.userId] ? <div style={{ opacity: 0.7 }}>Salvando...</div> : null}
                {memberRemoving[m.userId] ? <div style={{ opacity: 0.7 }}>Removendo...</div> : null}
              </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
          disabled={saving || !canManageMembers}
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

        {!canManageMembers ? (
          <div style={{ opacity: 0.7, marginTop: 8 }}>
            Voce nao tem permissao para convidar membros neste workspace.
          </div>
        ) : null}

        <div style={{ opacity: 0.7, marginTop: 8 }}>
          Se SMTP nao estiver configurado, o backend devolve um link para copiar (dev).
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Convites pendentes</div>
        {invitesErr ? (
          <div style={{ color: "#f87171", marginBottom: 10 }}>
            {invitesErr}{" "}
            <button
              onClick={loadInvites}
              style={{
                marginLeft: 8,
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid #2a2a2a",
                cursor: "pointer"
              }}
            >
              Tentar novamente
            </button>
          </div>
        ) : null}
        {loading ? (
          <div style={{ opacity: 0.8 }}>Carregando convites...</div>
        ) : rows.length === 0 ? (
          <div style={{ opacity: 0.8 }}>Sem convites pendentes.</div>
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

