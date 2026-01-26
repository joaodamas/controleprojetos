export class ApiError extends Error {
  status: number;
  body: any;

  constructor(status: number, body: any) {
    super(typeof body?.error === "string" ? body.error : `API_ERROR_${status}`);
    this.status = status;
    this.body = body;
  }
}

export function getAuthToken() {
  return localStorage.getItem("access_token") || "";
}

export function setAuthToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function clearAuthToken() {
  localStorage.removeItem("access_token");
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export async function api<T>(
  path: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<T> {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  let payload: any = null;
  const isJson = res.headers.get("content-type")?.includes("application/json");
  if (isJson) payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(res.status, payload ?? { error: "UNKNOWN_ERROR" });
  }

  return payload as T;
}