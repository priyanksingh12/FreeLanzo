import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDashboardPath } from "./getDashboardPath";

/**
 * Wraps routes that should only be visible to GUESTS (login, signup).
 * If the user is already authenticated, send them to wherever they
 * actually belong instead of letting them see the auth form.
 */
const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { role, onboardingStep } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath({ role, onboardingStep })} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
