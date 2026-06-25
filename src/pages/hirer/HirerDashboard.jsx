import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlus, FiUsers, FiBriefcase, FiDollarSign, FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { workersMock } from "../../mocks/workers.mock";

const HirerDashboard = () => {
  // Mock data for hirer view
  const topWorkers = workersMock.slice(0, 3);
  
  const stats = [
    { label: "Active Jobs", value: "3", icon: FiBriefcase, color: "bg-blue-100 text-blue-600" },
    { label: "Total Hires", value: "15", icon: FiUsers, color: "bg-green-100 text-green-600" },
    { label: "Total Spent", value: "$12,450", icon: FiDollarSign, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hirer Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your job postings and find top talent.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/hirer/workers"
            className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            <FiUsers /> Browse Workers
          </Link>
          <Link 
            to="/hirer/post-job"
            className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2.5 bg-[#6B46C1] text-white font-semibold rounded-xl hover:bg-[#553C9A] transition-colors shadow-sm shadow-[#6B46C1]/30"
          >
            <FiPlus /> Post a Job
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects (Mock) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Your Active Jobs</h2>
            <Link to="/hirer/jobs" className="text-sm font-medium text-[#6B46C1] hover:underline flex items-center">
              Manage all <FiChevronRight />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {idx === 0 ? "Full Stack React Developer needed for MVP" : idx === 1 ? "UI/UX Designer for Mobile App" : "SEO Specialist for E-commerce Site"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Posted on June {20 + idx}, 2026</p>
                    </div>
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg uppercase">
                      Open
                    </span>
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?u=a" alt="" />
                        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?u=b" alt="" />
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">+{idx * 3 + 2}</div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 ml-2">{idx * 3 + 4} Applications</span>
                    </div>
                    <Link to="#" className="text-sm font-semibold text-[#6B46C1] hover:underline">
                      Review Candidates
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Workers (Discover) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recommended Talent</h2>
            <Link to="/hirer/workers" className="text-sm font-medium text-[#6B46C1] hover:underline flex items-center">
              View all <FiChevronRight />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-5">
            <div className="space-y-5">
              {topWorkers.map((worker) => (
                <div key={worker.id} className="flex gap-4">
                  <img src={worker.avatarUrl} alt={worker.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <Link to={`/workers/${worker.id}`} className="font-semibold text-gray-900 hover:text-[#6B46C1] transition-colors block">
                      {worker.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{worker.title}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs font-medium text-gray-900">${worker.hourlyRate}/hr</span>
                      <span className="text-xs text-yellow-600 font-bold flex items-center gap-1">⭐ {worker.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/hirer/workers" className="block w-full text-center mt-5 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl transition-colors">
              Explore More Talent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HirerDashboard;
