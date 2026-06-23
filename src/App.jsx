import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Loginpage";
import Signup from "./pages/Signuppage";
import Home from "./pages/Home";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";


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
    </Routes>
  );
};

export default AppWrapper;
