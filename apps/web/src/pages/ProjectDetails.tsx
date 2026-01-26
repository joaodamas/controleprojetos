import React, { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

function TabLink(props: { to: string; label: string }) {
  return (
    <NavLink
      to={props.to}
      style={({ isActive }) => ({
        padding: "8px 12px",
        borderRadius: 10,
        border: "1px solid #2a2a2a",
        textDecoration: "none",
        color: "inherit",
        background: isActive ? "rgba(124,58,237,0.12)" : "transparent"
      })}
      end={props.to === "work-items"}
    >
      {props.label}
    </NavLink>
  );
}

export function ProjectDetails() {
  const { projectId } = useParams();

  useEffect(() => {
    if (!projectId) return;
    void api(endpoints.projectSeen(projectId), "POST").catch(() => undefined);
  }, [projectId]);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Projeto</h2>
      <div style={{ opacity: 0.8, marginTop: -6 }}>ID: {projectId}</div>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <TabLink to="work-items" label="Work Items" />
        <TabLink to="baselines" label="Baselines" />
        <TabLink to="risks" label="Riscos" />
        <TabLink to="interventions" label="Intervencoes" />
        <TabLink to="ops" label="Ops" />
        <TabLink to="audit" label="Audit" />
      </div>

      <div style={{ marginTop: 14 }}>
        <Outlet />
      </div>
    </div>
  );
}
