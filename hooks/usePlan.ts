// hooks/usePlan.ts
import { useUser } from "./useUser"; // Using the placeholder
import { PLAN_FEATURES } from "../types/plans";

type Plan = keyof typeof PLAN_FEATURES;

export function usePlan() {
  const { user } = useUser();
  const planName = (user?.plan as Plan) || 'STARTER';
  
  // Ensure the plan exists in PLAN_FEATURES, otherwise default to STARTER
  const features = PLAN_FEATURES[planName] ?? PLAN_FEATURES['STARTER'];

  return {
    planName,
    features,
    // Quick helpers
    isBusiness: planName === 'BUSINESS',
    canAccessScurve: features.hasScurve,
    isOverProjectLimit: (currentCount: number) => currentCount >= features.maxProjects
  };
}
