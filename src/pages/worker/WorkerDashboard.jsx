import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiDollarSign, FiBriefcase, FiCheckCircle, FiClock, FiChevronRight } from "react-icons/fi";
import { jobsMock, myApplicationsMock } from "../../mocks/jobs.mock";

const WorkerDashboard = () => {
  // We'll use the mock data for Recommended Jobs and Recent Applications
  const recommendedJobs = jobsMock.slice(0, 3);
  const recentApps = myApplicationsMock.slice(0, 3);

  // Mock stats
  const stats = [
    { label: "Active Projects", value: "2", icon: FiBriefcase, color: "bg-blue-100 text-blue-600" },
    { label: "Completed", value: "12", icon: FiCheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Total Earnings", value: "$4,520", icon: FiDollarSign, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your freelance business today.</p>
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
        {/* Recommended Jobs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recommended Jobs</h2>
            <Link to="/jobs" className="text-sm font-medium text-[#6B46C1] hover:underline flex items-center">
              View all <FiChevronRight />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recommendedJobs.map((job, idx) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img src={job.hirer.avatarUrl} alt={job.hirer.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <Link to={`/jobs/${job.id}`} className="font-semibold text-gray-900 group-hover:text-[#6B46C1] transition-colors">
                        {job.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5">{job.hirer.name} • {job.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${job.budget}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Fixed Price</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 line-clamp-2">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-lg">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><FiClock className="w-3.5 h-3.5" /> Posted 2h ago</span>
                    <span>{job.experienceLevel} Level</span>
                  </div>
                  <Link 
                    to={`/jobs/${job.id}/apply`}
                    className="px-4 py-1.5 bg-[#6B46C1]/10 text-[#6B46C1] hover:bg-[#6B46C1] hover:text-white transition-colors text-sm font-medium rounded-lg"
                  >
                    Apply Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
            <Link to="/applications" className="text-sm font-medium text-[#6B46C1] hover:underline flex items-center">
              View all <FiChevronRight />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {recentApps.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentApps.map((app, idx) => (
                  <div key={app.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <Link to={`/jobs/${app.job.id}`} className="font-medium text-gray-900 hover:text-[#6B46C1] transition-colors line-clamp-1">
                      {app.job.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{app.job.hirer.name}</p>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                        app.status === 'in_review' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {app.status === 'in_review' ? 'In Review' : 
                         app.status === 'rejected' ? 'Rejected' : 
                         'Accepted'}
                      </span>
                      <span className="text-xs font-medium text-gray-900">${app.proposedBudget} proposed</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiFileText className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900">No applications yet</p>
                <p className="text-xs text-gray-500 mt-1">Apply to jobs to see them here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
