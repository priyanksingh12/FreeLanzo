import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";

/**
 * Redirects the user to their respective dashboard based on their role.
 * Used at the root authenticated path.
 */
const RootRedirect = () => {
  const { role } = useSelector((state) => state.user);

  if (role === "worker") {
    return <Navigate to={ROUTES.WORKER_DASHBOARD} replace />;
  }

  if (role === "hirer") {
    return <Navigate to={ROUTES.HIRER_DASHBOARD} replace />;
  }

  // Fallback if role is somehow missing but they are onboarded
  // This shouldn't normally happen.
  return <Navigate to={ROUTES.LANDING} replace />;
};

export default RootRedirect;
