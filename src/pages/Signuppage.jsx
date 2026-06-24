import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { FaArrowLeft, FaEye, FaEyeSlash, FaSpinner, FaLock, FaEnvelope, FaUser } from "react-icons/fa";
import { authStart, authSuccess, authFailure, clearError } from "../features/auth/authSlice";
import { setUserData } from "../features/user/userSlice";
import axiosClient from "../api/axiosClient";
import { ROUTES } from "../routes/paths";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Clear errors when entering page
  useEffect(() => {
    dispatch(clearError());
    setValidationError("");
  }, [dispatch]);

  const validateForm = () => {
    if (!name.trim()) {
      setValidationError("Full Name is required");
      return false;
    }
    if (!email.trim()) {
      setValidationError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address");
      return false;
    }
    if (!password) {
      setValidationError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(authStart());
    try {
      const { data } = await axiosClient.post("/auth/register", { name, email, password });
dispatch(authSuccess(data.data));        // was: data.data.user
dispatch(setUserData(data.data.user));
navigate(ROUTES.HOME);
    } catch (err) {
      dispatch(authFailure(err.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-0 md:p-6 lg:p-12 font-sans">
      <div className="w-full max-w-[1200px] min-h-[700px] bg-white rounded-none md:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side: Premium Interactive Background */}
        <div className="hidden md:flex flex-col justify-between p-12 text-white relative overflow-hidden bg-cover bg-center"
             style={{
               backgroundImage: "linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(107, 70, 193, 0.95) 100%)",
             }}>
          
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-indigo-300/20 blur-3xl pointer-events-none"></div>

          {/* Top Logo and Back Navigation */}
          <div className="z-10 flex items-center justify-between">
            <button 
              onClick={() => navigate(ROUTES.LANDING)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition rounded-xl text-sm font-semibold backdrop-blur-sm border border-white/10"
            >
              <FaArrowLeft />
              Back to site
            </button>
            <span className="text-2xl font-bold tracking-tight">FreeLanzo</span>
          </div>

          {/* Hero Slogan & Glass Card */}
          <div className="z-10 my-auto">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-6">
              Build Your Career. <br />
              <span className="text-indigo-200">Grow Your Business.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Join the premium gig economy platform. Connect with elite freelancers, apply for remote jobs, and complete secure projects.
            </p>
          </div>

          {/* Footer Info */}
          <div className="z-10 text-white/60 text-sm flex justify-between items-center border-t border-white/10 pt-6">
            <span>© 2026 FreeLanzo Inc.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Input Form */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 bg-white relative">
          
          {/* Mobile Back Button */}
          <div className="md:hidden absolute top-6 left-6">
            <button 
              onClick={() => navigate(ROUTES.LANDING)}
              className="text-[#6B46C1] hover:text-[#553C9A] transition flex items-center gap-2 text-sm font-semibold"
            >
              <FaArrowLeft /> Back
            </button>
          </div>

          <div className="w-full max-w-[400px] mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Create your account
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Join the premium gig economy platform and start growing today.
              </p>
            </div>

            {/* Error Messages */}
            {(validationError || error) && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-700 text-sm flex items-center justify-between">
                <span>{validationError || error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all text-sm"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all text-sm"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all text-sm"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6B46C1]/20 focus:border-[#6B46C1] transition-all text-sm"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6B46C1] hover:bg-[#553C9A] text-white font-bold py-3 px-6 rounded-xl transition shadow-lg shadow-[#6B46C1]/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>

            {/* Social Logins */}
            <div className="mt-6 flex items-center gap-4">
              <div className="h-px bg-gray-200 flex-grow"></div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Or Sign up With</span>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>

            <div className="mt-4 flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  dispatch(authStart());
                  try {
                    const { data } = await axiosClient.post("/auth/google", { idToken: credentialResponse.credential });
dispatch(authSuccess(data.data));        // was: data.data.user
dispatch(setUserData(data.data.user));
navigate(ROUTES.HOME);
                  } catch (err) {
                    dispatch(authFailure(err.response?.data?.message || "Google sign-in failed"));
                  }
                }}
                onError={() => dispatch(authFailure("Google sign-in failed"))}
              />
            </div>

            {/* Footer Login Navigation */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="text-[#6B46C1] hover:text-[#553C9A] font-bold hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
