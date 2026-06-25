import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";

/**
 * Route guard that ensures the logged-in user has the specific role
 * required to view these routes.
 */
const RoleRoute = ({ allowedRole }) => {
  const { role } = useSelector((state) => state.user);

  if (role !== allowedRole) {
    // If they have the wrong role, send them to the landing page or their own dashboard
    // We'll send them to LANDING to be safe, which will redirect them based on auth state if needed.
    return <Navigate to={ROUTES.LANDING} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
