import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/client";

export function Login() {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const t = token.trim();
    if (!t) {
      setError("Cole um JWT valido.");
      return;
    }

    setAuthToken(t);
    navigate("/post-auth");
  }

  return (
    <div style={{ maxWidth: 520, margin: "80px auto", border: "1px solid #2a2a2a", borderRadius: 14, padding: 18 }}>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <p style={{ opacity: 0.8 }}>
        MVP: cole um JWT (sub = userId). Depois a gente pluga /api/login.
      </p>

      <form onSubmit={submit}>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={6}
          placeholder="Bearer token (JWT)..."
          style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #2a2a2a" }}
        />
        {error ? <div style={{ color: "#f87171", marginTop: 8 }}>{error}</div> : null}

        <button
          type="submit"
          style={{ marginTop: 10, padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2a2a", cursor: "pointer" }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
