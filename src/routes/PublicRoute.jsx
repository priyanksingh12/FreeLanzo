import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";

/**
 * Wraps routes that should only be visible to GUESTS (login, signup).
 * If the user is already authenticated, redirect them to HOME instead of
 * letting them see the auth form at all. This removes the "flash then
 * bounce back" effect, since the redirect happens BEFORE the page renders,
 * not inside a useEffect after the page already mounted.
 */
const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
