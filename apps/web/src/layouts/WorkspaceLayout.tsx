import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import type { WorkspaceDTO } from "../loaders";
import { clearAuthToken } from "../api/client";

export function WorkspaceLayout() {
  const ws = useLoaderData() as WorkspaceDTO;
  const navigate = useNavigate();

  function logout() {
    clearAuthToken();
    navigate("/login");
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      <aside style={{ borderRight: "1px solid #2a2a2a", padding: 16 }}>
        <div style={{ fontWeight: 900 }}>{ws.name}</div>
        <div style={{ opacity: 0.7, marginTop: 4 }}>Role: {ws.userRole}</div>

        <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
          <NavLink
            to={`/w/${ws.id}`}
            style={({ isActive }) => ({
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #2a2a2a",
              textDecoration: "none",
              color: "inherit",
              background: isActive ? "rgba(124,58,237,0.12)" : "transparent"
            })}
          >
            Dashboard
          </NavLink>

          <NavLink
            to={`/w/${ws.id}/inbox`}
            style={({ isActive }) => ({
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #2a2a2a",
              textDecoration: "none",
              color: "inherit",
              background: isActive ? "rgba(124,58,237,0.12)" : "transparent"
            })}
          >
            Inbox
          </NavLink>

          {!ws.blueprintId ? (
            <NavLink
              to={`/w/${ws.id}/onboarding`}
              style={({ isActive }) => ({
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #2a2a2a",
                textDecoration: "none",
                color: "inherit",
                background: isActive ? "rgba(124,58,237,0.12)" : "transparent"
              })}
            >
              Onboarding
            </NavLink>
          ) : null}

          <button
            onClick={logout}
            style={{
              marginTop: 16,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #2a2a2a",
              background: "transparent",
              color: "inherit",
              cursor: "pointer"
            }}
          >
            Sair
          </button>
        </div>
      </aside>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}

