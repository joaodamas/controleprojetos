import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { WorkspaceDTO } from "../loaders";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

export function Onboarding() {
  const ws = useLoaderData() as WorkspaceDTO;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  async function install() {
    setLoading(true);
    setErr(null);

    try {
      await api(endpoints.installBlueprint(ws.id), "POST", { blueprintId: "implementation_go_live" });
      navigate(`/w/${ws.id}`);
    } catch (e: any) {
      setErr(e?.message ?? "Falha ao instalar blueprint");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Onboarding</h2>
      {ws.blueprintId ? (
        <div style={{ opacity: 0.8 }}>
          Blueprint ja instalado: <b>{ws.blueprintId}</b>. Voce pode voltar ao dashboard.
        </div>
      ) : (
        <>
          <p style={{ opacity: 0.8 }}>Instale o blueprint para liberar criacao de projetos.</p>
          <button
            onClick={install}
            disabled={loading}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer" }}
          >
            {loading ? "Instalando..." : "Instalar blueprint (Go-live)"}
          </button>
          {err ? <div style={{ color: "#f87171", marginTop: 10 }}>{err}</div> : null}
        </>
      )}
    </div>
  );
}
