export const endpoints = {
  health: () => `/api/health`,

  workspaces: () => `/api/workspaces`,
  workspace: (id: string) => `/api/workspaces/${id}`,
  installBlueprint: (id: string) => `/api/workspaces/${id}/blueprint/install`,
  createProject: (workspaceId: string) => `/api/workspaces/${workspaceId}/projects`,
  workspaceInvites: (workspaceId: string) => `/api/workspaces/${workspaceId}/invites`,
  createWorkspaceInvite: (workspaceId: string) => `/api/workspaces/${workspaceId}/invites`,
  revokeWorkspaceInvite: (workspaceId: string, inviteId: string) =>
    `/api/workspaces/${workspaceId}/invites/${inviteId}/revoke`,
  acceptInvite: () => `/api/invites/accept`,

  projectWorkItems: (projectId: string) => `/api/projects/${projectId}/work-items`,
  patchWorkItem: (workItemId: string) => `/api/work-items/${workItemId}`,

  projectBaselines: (projectId: string) => `/api/projects/${projectId}/baselines`,
  createBaseline: (projectId: string) => `/api/projects/${projectId}/baselines`,
  projectRisks: (projectId: string) => `/api/projects/${projectId}/risks`,
  projectInterventions: (projectId: string) => `/api/projects/${projectId}/interventions`,
  patchIntervention: (id: string) => `/api/interventions/${id}`,
  workspaceProjects: (workspaceId: string) => `/api/workspaces/${workspaceId}/projects`,
  projectSeen: (projectId: string) => `/api/projects/${projectId}/seen`,
  inboxInterventions: () => `/api/interventions`,
  projectRecomputeRuns: (projectId: string) => `/api/projects/${projectId}/recompute-runs`,
  projectAuditEvents: (projectId: string) => `/api/projects/${projectId}/audit-events`,
  projectBaselineDiff: (projectId: string) => `/api/projects/${projectId}/baseline-diff`
};
