// Centralized route paths — import these everywhere instead of typing
// raw strings like "/login" so a rename only happens in one place.

export const ROUTES = {
  LANDING: "/landing",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ONBOARDING_ROLE: "/onboarding/role",
  ONBOARDING_LOCATION: "/onboarding/location",
  ONBOARDING_SKILLS: "/onboarding/skills",
  ONBOARDING_PROFILE: "/onboarding/profile",
  
  // Dashboards & Features
  WORKER_DASHBOARD: "/worker/dashboard",
  HIRER_DASHBOARD: "/hirer/dashboard",
  APPLY_JOB: "/jobs/:jobId/apply",
  POST_JOB: "/hirer/post-job",
  WORKER_DISCOVERY: "/hirer/workers",
  WORKER_PROFILE: "/workers/:workerId"
};
