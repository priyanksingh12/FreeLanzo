import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { ROUTES } from "../../routes/paths";
import { 
  FiHome, FiBriefcase, FiUsers, FiMessageSquare, 
  FiFileText, FiSettings, FiMenu, FiX, FiBell 
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const { role, user } = useSelector((state) => state.user);
  const { user: authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Fallback to auth state if user slice doesn't have name/avatar yet
  const displayName = authUser?.name || user?.name || "User";
  const displayAvatar = user?.avatarUrl || authUser?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6B46C1&color=fff`;

  const handleLogout = () => {
    dispatch(logout());
  };

  const workerLinks = [
    { name: "Dashboard", path: ROUTES.WORKER_DASHBOARD, icon: FiHome },
    { name: "Find Jobs", path: "/jobs", icon: FiBriefcase },
    { name: "My Applications", path: "/applications", icon: FiFileText },
    { name: "Messages", path: "/messages", icon: FiMessageSquare },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  const hirerLinks = [
    { name: "Dashboard", path: ROUTES.HIRER_DASHBOARD, icon: FiHome },
    { name: "Post a Job", path: ROUTES.POST_JOB, icon: FiBriefcase },
    { name: "Discover Workers", path: ROUTES.WORKER_DISCOVERY, icon: FiUsers },
    { name: "Messages", path: "/messages", icon: FiMessageSquare },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  const navLinks = role === "worker" ? workerLinks : role === "hirer" ? hirerLinks : [];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/" className="text-2xl font-bold text-[#6B46C1]">
            FreeLanzo
          </Link>
          <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || location.pathname.startsWith(`${link.path}/`);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#6B46C1]/10 text-[#6B46C1] font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-[#6B46C1]" : ""}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10 sticky top-0">
          <button
            className="p-2 -ml-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100 transition">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-gray-100"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-700 leading-none">{displayName}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{role}</p>
                </div>
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-20 w-48 py-1 mt-2 bg-white rounded-xl shadow-lg ring-1 ring-black/5"
                    >
                      <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 capitalize">{role}</p>
                      </div>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6B46C1] transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Log out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
