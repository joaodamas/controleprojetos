// types/plans.ts
export const PLAN_FEATURES = {
  STARTER: {
    maxProjects: 3,
    hasGantt: false,
    hasScurve: false,
    canEditEpics: false,
  },
  PRO: {
    maxProjects: 15,
    hasGantt: true,
    hasScurve: false,
    canEditEpics: true,
  },
  BUSINESS: {
    maxProjects: Infinity,
    hasGantt: true,
    hasScurve: true,
    canEditEpics: true,
  }
} as const;
