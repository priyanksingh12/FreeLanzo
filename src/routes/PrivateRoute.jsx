import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { onboardingStep } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (onboardingStep && onboardingStep !== "completed") {
    return <Navigate to={ROUTES.ONBOARDING_ROLE} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
