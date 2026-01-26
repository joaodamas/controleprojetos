import { redirect } from "react-router-dom";
import { api, ApiError } from "./api/client";
import { endpoints } from "./api/endpoints";

export type WorkspaceDTO = {
  id: string;
  name: string;
  userRole: string;
  blueprintId?: string | null;
  blueprintVersion?: number | null;
  statuses: string[];
};

export type WorkItem = {
  id: string;
  projectId: string;
  title: string;
  type: string;
  status: string;
  startDate: string | null;
  dueDate: string | null;
  doneAt: string | null;
  ownerUserId: string | null;
  isCritical: boolean;
};

function isOnboardingPath(url: string) {
  const u = new URL(url);
  return u.pathname.includes("/onboarding");
}

function isLoginishPath(url: string) {
  const u = new URL(url);
  return u.pathname === "/login" || u.pathname === "/post-auth";
}

export async function postAuthLoader() {
  try {
    const workspaces = await api<WorkspaceDTO[]>(endpoints.workspaces(), "GET");

    if (workspaces.length === 0) {
      const created = await api<{ id: string }>(endpoints.workspaces(), "POST", { name: "Workspace" });
      return redirect(`/w/${created.id}`);
    }

    return redirect(`/w/${workspaces[0].id}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return redirect("/login");
    return redirect("/login");
  }
}

export async function workspaceLoader({ params, request }: any) {
  const workspaceId = String(params.workspaceId);

  try {
    const ws = await api<WorkspaceDTO>(endpoints.workspace(workspaceId), "GET");

    if (!ws.blueprintId && !isOnboardingPath(request.url) && !isLoginishPath(request.url)) {
      return redirect(`/w/${workspaceId}/onboarding`);
    }

    return ws;
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return redirect("/login");
    throw e;
  }
}

export async function workItemsLoader({ params }: any) {
  const projectId = String(params.projectId);

  try {
    const data = await api<{ statuses: string[]; items: WorkItem[] }>(endpoints.projectWorkItems(projectId), "GET");
    return data;
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) return redirect("/login");
    throw e;
  }
}