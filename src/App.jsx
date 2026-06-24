import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Loginpage";
import Signup from "./pages/Signuppage";
import Home from "./pages/Home";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import OnboardingRoute from "./routes/OnboardingRoute";
import OnboardingLayout from "./pages/onboarding/OnboardingLayout";
import RoleSelection from "./pages/onboarding/RoleSelection";
import LocationSelection from "./pages/onboarding/LocationSelection";
import SkillsSetup from "./pages/onboarding/SkillsSetup";
import ProfileCreation from "./pages/onboarding/ProfileCreation";


const AppWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing" />} />

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
        <Route path="/home" element={<Home />} />
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
