import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";

/**
 * Wraps routes that require the user to be logged in (e.g. dashboards,
 * profiles). If not authenticated, send them to login.
 * Handles root routing based on onboarding status and user role.
 */
const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { onboardingStep, role } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (onboardingStep && onboardingStep !== "completed") {
    return <Navigate to={ROUTES.ONBOARDING_ROLE} replace />;
  }

  // If they somehow land exactly on the route wrapped by just PrivateRoute (e.g. root auth wrapper),
  // they can stay on nested routes via Outlet, but usually we handle root redirects here if needed.
  // Actually, wait, PrivateRoute wraps all authenticated routes (both worker and hirer).
  // If we want a dynamic root redirect from a base route, maybe we should have a `RootRedirect` component.
  // The user requested: "once a user's onboardingStep === 'completed', PrivateRoute should redirect based on role directly to /worker/dashboard or /hirer/dashboard"
  // But if PrivateRoute wraps EVERYTHING (including /worker/dashboard), then returning a <Navigate> here unconditionally will cause an infinite loop.
  // Ah, the user probably meant that if they go to a generic route like the old `/home`, they should be redirected.
  // A better way is to use PrivateRoute just for auth/onboarding checking and return <Outlet />.
  // We can create an `IndexRedirect` for the root `/` or just use the logic in App.jsx.
  // Let me rethink: The user provided exact code:
  // if (onboardingStep !== "completed") { return <Navigate to={ROUTES.ONBOARDING_ROLE} replace />; }
  // if (role === "worker") return <Navigate to={ROUTES.WORKER_DASHBOARD} replace />;
  // if (role === "hirer") return <Navigate to={ROUTES.HIRER_DASHBOARD} replace />;
  // If we put this in PrivateRoute, it will ALWAYS redirect, even if they are trying to visit `/workers/123`.
  // That would be a bug. We only want to redirect if they hit the index of PrivateRoute.
  // Let's implement what they said, but I will adjust it in App.jsx to use an Index component for the root of PrivateRoute.
  
  return <Outlet />;
};

export default PrivateRoute;
