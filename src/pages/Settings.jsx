import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaExchangeAlt } from "react-icons/fa";
import axiosClient from "../api/axiosClient";
import { setUserData } from "../features/user/userSlice";
import { ROUTES } from "../routes/paths";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSwitchRole = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosClient.patch("/onboarding/reset-role");
      dispatch(setUserData(data.data.user));
      navigate(ROUTES.ONBOARDING_ROLE);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to switch role");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">
        Logged in as <span className="font-semibold">{user?.name}</span> —
        currently set up as a{" "}
        <span className="font-semibold">{role === "worker" ? "Worker" : "Hirer"}</span>.
      </p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Switch Role</h2>
        <p className="text-sm text-gray-500 mb-4">
          Want to use FreeLanzo as a {role === "worker" ? "Hirer" : "Worker"}{" "}
          instead? This will walk you back through onboarding to set up
          your new role. Your existing profile data is kept and will be
          restored if you switch back later.
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSwitchRole}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#6B46C1] hover:bg-[#553C9A] text-white font-semibold rounded-xl transition disabled:opacity-60"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaExchangeAlt />}
          {loading ? "Switching..." : "Switch Role"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
