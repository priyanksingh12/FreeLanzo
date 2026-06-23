import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

// TEMPORARY placeholder — replace with the real homepage later.
// Includes a logout button so the login/signup flow can be tested
// repeatedly without manually clearing localStorage every time.
const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome{user?.name ? `, ${user.name}` : ""} 👋
      </h1>
      <p className="text-gray-500">This is a placeholder homepage.</p>
      <button
        onClick={() => dispatch(logout())}
        className="px-6 py-2.5 bg-[#6B46C1] text-white rounded-xl font-semibold hover:bg-[#553C9A] transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
