import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./paths";

/**
 * Wraps routes that require the user to be logged in (e.g. /home,
 * /dashboard, /profile). If not authenticated, send them to login.
 */
const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
