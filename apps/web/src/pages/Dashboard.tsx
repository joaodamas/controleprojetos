import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { WorkspaceDTO } from "../loaders";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

type ProjectRow = {
  id: string;
  name: string;
  health: string | null;
  healthReason: string | null;
  openHighRisks: number;
  openInterventions: number;
  hasNew: boolean;
};

export function Dashboard() {
  const ws = useLoaderData() as WorkspaceDTO;
  const [name, setName] = useState("Projeto 1");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const navigate = useNavigate();

  async function loadProjects() {
    setLoadingProjects(true);
    setErr(null);
    try {
      const data = await api<{ projects: ProjectRow[] }>(endpoints.workspaceProjects(ws.id), "GET");
      setProjects(data.projects);
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao carregar projetos");
    } finally {
      setLoadingProjects(false);
    }
  }

  useEffect(() => {
    void loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.id]);

  async function createProject() {
    setLoading(true);
    setErr(null);

    try {
      const created = await api<{ id: string; name: string }>(endpoints.createProject(ws.id), "POST", { name });
      navigate(`/w/${ws.id}/projects/${created.id}`);
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao criar projeto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {!ws.blueprintId ? (
        <div style={{ opacity: 0.8 }}>
          Blueprint nao instalado. Va em <b>Onboarding</b>.
        </div>
      ) : (
        <>
          <div style={{ marginTop: 12, border: "1px solid #2a2a2a", borderRadius: 12, padding: 12, maxWidth: 520 }}>
            <div style={{ fontWeight: 800 }}>Criar projeto</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginTop: 8, padding: 10, borderRadius: 10, border: "1px solid #2a2a2a" }}
            />
            <button
              onClick={createProject}
              disabled={loading}
              style={{ marginTop: 10, padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer" }}
            >
              {loading ? "Criando..." : "Criar"}
            </button>
            {err ? <div style={{ color: "#f87171", marginTop: 10 }}>{err}</div> : null}
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Projetos</div>
            {loadingProjects ? (
              <div style={{ opacity: 0.8 }}>Carregando...</div>
            ) : projects.length === 0 ? (
              <div style={{ opacity: 0.8 }}>Sem projetos.</div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {projects.map((project) => (
                  <div
                    key={project.id}
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
                        {project.name} {project.hasNew ? <span style={{ color: "#f97316" }}>• NOVO</span> : null}
                      </div>
                      <div style={{ opacity: 0.75, marginTop: 4 }}>
                        health: {project.health ?? "-"} • riscos: {project.openHighRisks} • intervencoes:{" "}
                        {project.openInterventions}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/w/${ws.id}/projects/${project.id}`)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #2a2a2a",
                        cursor: "pointer",
                        height: 36
                      }}
                    >
                      Abrir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
