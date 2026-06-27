import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";
import { getDashboardPath } from "./getDashboardPath";

/**
 * Handles "/" directly: guests go to the landing page, authenticated
 * users go to wherever they belong (onboarding step or their dashboard).
 */
const RootRedirect = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { role, onboardingStep } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LANDING} replace />;
  }

  return <Navigate to={getDashboardPath({ role, onboardingStep })} replace />;
};

export default RootRedirect;
