import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";
import { getDashboardPath } from "./getDashboardPath";

const OnboardingRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { role, onboardingStep } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (onboardingStep === "completed") {
    return <Navigate to={getDashboardPath({ role, onboardingStep })} replace />;
  }

  return <Outlet />;
};

export default OnboardingRoute;
