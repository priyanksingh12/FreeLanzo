import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Loginpage";
import Signup from "./pages/Signuppage";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import RoleRoute from "./routes/RoleRoute";
import RootRedirect from "./routes/RootRedirect";
import OnboardingRoute from "./routes/OnboardingRoute";
import OnboardingLayout from "./pages/onboarding/OnboardingLayout";
import RoleSelection from "./pages/onboarding/RoleSelection";
import LocationSelection from "./pages/onboarding/LocationSelection";
import SkillsSetup from "./pages/onboarding/SkillsSetup";
import ProfileCreation from "./pages/onboarding/ProfileCreation";
import DashboardLayout from "./components/layout/DashboardLayout";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import ApplyJob from "./pages/worker/ApplyJob";
import HirerDashboard from "./pages/hirer/HirerDashboard";
import PostJob from "./pages/hirer/PostJob";
import WorkerDiscovery from "./pages/hirer/WorkerDiscovery";
import WorkerProfile from "./pages/shared/WorkerProfile";
import axiosClient from "./api/axiosClient";
import { authSuccess, logout } from "./features/auth/authSlice";
import { setUserData } from "./features/user/userSlice";

const AppWrapper = () => {
  const dispatch = useDispatch();
  // Blocks rendering of routes until we've confirmed whether the stale
  // localStorage "isAuthenticated" flag actually corresponds to a real,
  // still-valid session on the backend.
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Uses the httpOnly refresh-token cookie (if present and valid)
        // to get a fresh access token and confirm the user still exists.
        const { data } = await axiosClient.post("/auth/refresh-token");
        dispatch(authSuccess(data.data)); // { user, accessToken }
        dispatch(setUserData(data.data.user));
      } catch (err) {
        // No valid cookie, or the user behind it no longer exists in the DB
        // (e.g. you wiped the database during testing) — clear the stale
        // localStorage/Redux state so the app behaves like a logged-out user.
        dispatch(logout());
      } finally {
        setCheckingSession(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  if (checkingSession) {
    // Replace with a branded spinner/skeleton later if you want —
    // functionally this just needs to render SOMETHING other than the
    // real routes until the check above finishes.
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 border-4 border-[#6B46C1] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route
        path="/landing"
        element={
          <>
            <Landing />
          </>
        }
      />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoute />}>

        
        {/* Dashboard Layout for authenticated users */}
        <Route element={<DashboardLayout />}>
          
          {/* Worker Routes */}
          <Route element={<RoleRoute allowedRole="worker" />}>
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/jobs/:jobId/apply" element={<ApplyJob />} />
          </Route>
          
          {/* Hirer Routes */}
          <Route element={<RoleRoute allowedRole="hirer" />}>
            <Route path="/hirer/dashboard" element={<HirerDashboard />} />
            <Route path="/hirer/post-job" element={<PostJob />} />
            <Route path="/hirer/workers" element={<WorkerDiscovery />} />
          </Route>

          {/* Shared Routes within layout */}
          <Route path="/workers/:workerId" element={<WorkerProfile />} />

        </Route>
      </Route>

      <Route element={<OnboardingRoute />}>
        <Route element={<OnboardingLayout />}>
          <Route path="/onboarding/role" element={<RoleSelection />} />
          <Route path="/onboarding/location" element={<LocationSelection />} />
          <Route path="/onboarding/skills" element={<SkillsSetup />} />
          <Route path="/onboarding/profile" element={<ProfileCreation />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppWrapper;