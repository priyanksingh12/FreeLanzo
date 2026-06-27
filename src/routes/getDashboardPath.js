import { ROUTES } from "./paths";

/**
 * Given the current auth/onboarding state, returns the one correct
 * destination for an authenticated user. Centralizing this logic means
 * a future change (new role, new onboarding step, renamed route) only
 * has to happen in ONE place instead of being duplicated — and drifting
 * out of sync — across every route guard.
 */
export const getDashboardPath = ({ role, onboardingStep }) => {
  if (onboardingStep && onboardingStep !== "completed") {
    return ROUTES.ONBOARDING_ROLE;
  }
  if (role === "worker") return ROUTES.WORKER_DASHBOARD;
  if (role === "hirer") return ROUTES.HIRER_DASHBOARD;

  // Safety net: authenticated, onboarding marked complete, but role is
  // somehow still null. Should not normally happen — send to landing
  // rather than render nothing.
  return ROUTES.LANDING;
};
