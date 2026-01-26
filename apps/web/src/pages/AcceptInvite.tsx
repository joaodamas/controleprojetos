import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

export function AcceptInvite() {
  const { token } = useParams();
  const nav = useNavigate();
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const data = await api<{ ok: boolean; workspaceId: string }>(
          endpoints.acceptInvite(),
          "POST",
          { token }
        );
        nav(`/w/${data.workspaceId}`);
      } catch (e: any) {
        setErr(e?.message ?? "Falha ao aceitar convite");
      }
    })();
  }, [token, nav]);

  return (
    <div>
      <h2>Aceitar convite</h2>
      {err ? (
        <div style={{ color: "#f87171" }}>{err}</div>
      ) : (
        <div style={{ opacity: 0.8 }}>Processando...</div>
      )}
      <div style={{ opacity: 0.7, marginTop: 10 }}>
        Se der 401, faca login e volte neste link.
      </div>
    </div>
  );
}
