import React, { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Shield,
  User,
  X,
  Settings,
  Users,
  CheckCircle2,
  AlertTriangle,
  PauseCircle,
} from "lucide-react";

type Role = "Owner" | "Admin" | "Member";
type Status = "active" | "pending" | "suspended";

type PermissionKey =
  | "createTasks"
  | "viewBudgets"
  | "manageUsers"
  | "accessReports"
  | "editProjects";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  lastLogin: string;
  permissions: Record<PermissionKey, boolean>;
};

const USERS: UserRecord[] = [
  {
    id: "user-1",
    name: "Joao Damas",
    email: "joao@jpprojects.com.br",
    role: "Owner",
    status: "active",
    lastLogin: "2026-01-18 08:45",
    permissions: {
      createTasks: true,
      viewBudgets: true,
      manageUsers: true,
      accessReports: true,
      editProjects: true,
    },
  },
  {
    id: "user-2",
    name: "Hanna Kodama",
    email: "hanna.bbpaper@gmail.com",
    role: "Admin",
    status: "active",
    lastLogin: "2026-01-18 09:11",
    permissions: {
      createTasks: true,
      viewBudgets: true,
      manageUsers: true,
      accessReports: true,
      editProjects: true,
    },
  },
  {
    id: "user-3",
    name: "Lucas Svizzero",
    email: "lucas@jpprojects.com.br",
    role: "Member",
    status: "pending",
    lastLogin: "Invite sent",
    permissions: {
      createTasks: true,
      viewBudgets: false,
      manageUsers: false,
      accessReports: false,
      editProjects: true,
    },
  },
  {
    id: "user-4",
    name: "Fernanda Silva",
    email: "fernanda@jpprojects.com.br",
    role: "Member",
    status: "suspended",
    lastLogin: "2025-12-20 17:02",
    permissions: {
      createTasks: false,
      viewBudgets: false,
      manageUsers: false,
      accessReports: false,
      editProjects: false,
    },
  },
];

const PERMISSIONS: Array<{ key: PermissionKey; label: string; hint: string }> = [
  {
    key: "createTasks",
    label: "Create tasks",
    hint: "Can create and assign activities in projects.",
  },
  {
    key: "editProjects",
    label: "Edit projects",
    hint: "Can edit scope, deadlines, and milestones.",
  },
  {
    key: "viewBudgets",
    label: "View budgets",
    hint: "Access financial data and project costs.",
  },
  {
    key: "accessReports",
    label: "Access reports",
    hint: "Generate and export performance reports.",
  },
  {
    key: "manageUsers",
    label: "Manage users",
    hint: "Invite, suspend, and edit team members.",
  },
];

const ROLE_STYLES: Record<Role, string> = {
  Owner: "bg-purple-500/10 text-purple-300 border border-purple-500/30",
  Admin: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30",
  Member: "bg-slate-500/10 text-slate-300 border border-slate-500/30",
};

const STATUS_STYLES: Record<Status, { label: string; className: string; icon: React.ReactNode }> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  suspended: {
    label: "Suspended",
    className: "bg-rose-500/10 text-rose-300 border border-rose-500/30",
    icon: <PauseCircle className="h-3 w-3" />,
  },
};

export default function AdminWorkspace() {
  const [users, setUsers] = useState<UserRecord[]>(USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const activeUser = useMemo(
    () => users.find((user) => user.id === activeUserId) || null,
    [activeUserId, users]
  );

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesQuery =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredUsers.length) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(filteredUsers.map((user) => user.id));
  };

  const updatePermission = (id: string, key: PermissionKey) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              permissions: {
                ...user.permissions,
                [key]: !user.permissions[key],
              },
            }
          : user
      )
    );
  };

  const updateRole = (id: string, role: Role) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role } : user)));
  };

  const updateStatus = (id: string, status: Status) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status } : user)));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200">
      <div className="grid min-h-screen grid-cols-[260px_1fr]">
        <aside className="border-r border-[#27272a] bg-[#0b0b0f] px-6 py-8">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">
              JP Projects
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Workspace</h2>
          </div>
          <nav className="space-y-2 text-sm">
            {[
              { icon: <Users className="h-4 w-4" />, label: "Team" },
              { icon: <Settings className="h-4 w-4" />, label: "Settings" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-left text-slate-300 transition hover:border-[#27272a] hover:bg-[#111113]"
              >
                <span className="text-emerald-400">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="border-b border-[#27272a] bg-[#0f0f14] px-8 py-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Home / Team management
                </p>
                <h1 className="mt-2 text-3xl font-bold text-white">Gerenciamento de equipe</h1>
                <p className="mt-1 text-sm text-slate-400">
                  Controle acessos, permissoes e convites com seguranca.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar usuario ou email"
                    className="w-64 rounded-lg border border-[#27272a] bg-[#121218] py-2 pl-10 pr-4 text-sm text-slate-200 outline-none transition focus:border-emerald-500"
                  />
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  <UserPlus className="h-4 w-4" />
                  Convidar usuario
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-6 px-8 py-6">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value as Role | "all")}
                className="rounded-lg border border-[#27272a] bg-[#121218] px-3 py-2 text-sm text-slate-200 outline-none"
              >
                <option value="all">All roles</option>
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as Status | "all")}
                className="rounded-lg border border-[#27272a] bg-[#121218] px-3 py-2 text-sm text-slate-200 outline-none"
              >
                <option value="all">All status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                className="rounded-lg border border-[#27272a] px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-400 transition hover:border-emerald-500"
              >
                Clear filters
              </button>
            </div>

            <div className="rounded-2xl border border-[#27272a] bg-[#18181b] shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-[#27272a] px-6 py-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Usuarios do workspace</h2>
                  <p className="text-sm text-slate-400">
                    Selecione um usuario para abrir o painel lateral.
                  </p>
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {filteredUsers.length} usuarios
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#121218] text-xs uppercase tracking-[0.2em] text-slate-500">
                    <tr>
                      <th className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.length > 0 && selectedIds.length === filteredUsers.length}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 rounded border-[#27272a] bg-[#0f0f14] text-emerald-500"
                        />
                      </th>
                      <th className="px-6 py-4">Nome</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Ultimo login</th>
                      <th className="px-6 py-4 text-right">Acoes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a]">
                    {filteredUsers.map((user) => {
                      const status = STATUS_STYLES[user.status];
                      return (
                        <tr
                          key={user.id}
                          className="cursor-pointer transition hover:bg-white/5"
                          onClick={() => setActiveUserId(user.id)}
                        >
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(user.id)}
                              onChange={() => toggleSelect(user.id)}
                              onClick={(event) => event.stopPropagation()}
                              className="h-4 w-4 rounded border-[#27272a] bg-[#0f0f14] text-emerald-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${ROLE_STYLES[user.role]}`}>
                              {user.role === "Owner" ? (
                                <Shield className="h-3 w-3" />
                              ) : (
                                <User className="h-3 w-3" />
                              )}
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${status.className}`}>
                              {status.icon}
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400">{user.lastLogin}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                setActiveUserId(user.id);
                              }}
                              className="rounded-lg border border-transparent p-2 text-slate-400 transition hover:border-[#27272a] hover:text-white"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-72 right-6 z-40 rounded-2xl border border-[#27272a] bg-[#111214] px-6 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-slate-300">
              {selectedIds.length} usuarios selecionados
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-lg border border-[#27272a] px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300 transition hover:border-emerald-500"
              >
                Mudar role
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#27272a] px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300 transition hover:border-emerald-500"
              >
                Adicionar ao projeto
              </button>
              <button
                type="button"
                className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-rose-200 transition hover:border-rose-500"
              >
                Desativar
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed inset-0 z-50 ${activeUser ? "" : "pointer-events-none"}`}
        aria-hidden={!activeUser}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            activeUser ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setActiveUserId(null)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-md border-l border-[#27272a] bg-[#111114] px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform ${
            activeUser ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {activeUser && (
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    User settings
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{activeUser.name}</h3>
                  <p className="text-sm text-slate-400">{activeUser.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveUserId(null)}
                  className="rounded-lg border border-transparent p-2 text-slate-400 transition hover:border-[#27272a] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Role</p>
                      <p className="mt-2 text-sm text-slate-300">Define acesso principal.</p>
                    </div>
                    <select
                      value={activeUser.role}
                      onChange={(event) => updateRole(activeUser.id, event.target.value as Role)}
                      className="rounded-lg border border-[#27272a] bg-[#121218] px-3 py-2 text-sm text-slate-200 outline-none"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Status</p>
                      <p className="mt-2 text-sm text-slate-300">
                        Controle a disponibilidade do usuario.
                      </p>
                    </div>
                    <select
                      value={activeUser.status}
                      onChange={(event) => updateStatus(activeUser.id, event.target.value as Status)}
                      className="rounded-lg border border-[#27272a] bg-[#121218] px-3 py-2 text-sm text-slate-200 outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Permissions
                  </p>
                  <div className="mt-4 space-y-3">
                    {PERMISSIONS.map((permission) => (
                      <label
                        key={permission.key}
                        className="flex items-start justify-between gap-3 rounded-lg border border-[#27272a] bg-[#111113] px-3 py-3"
                      >
                        <div>
                          <p className="text-sm text-slate-200">{permission.label}</p>
                          <p className="text-xs text-slate-500">{permission.hint}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => updatePermission(activeUser.id, permission.key)}
                          className={`h-6 w-11 rounded-full border transition ${
                            activeUser.permissions[permission.key]
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-[#27272a] bg-[#0f0f14]"
                          }`}
                        >
                          <span
                            className={`block h-5 w-5 rounded-full bg-white transition ${
                              activeUser.permissions[permission.key] ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto border-t border-[#27272a] pt-5">
                <button
                  type="button"
                  className="w-full rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:border-rose-500"
                >
                  Suspend user
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
