import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiStar, FiBriefcase, FiCheckCircle, FiClock, FiMessageSquare } from "react-icons/fi";
import { workersMock } from "../../mocks/workers.mock";

const WorkerProfile = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  // Find worker from mock data
  const worker = workersMock.find((w) => w.id === workerId) || workersMock[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft /> Back to Search
      </button>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#6B46C1]/20 to-blue-500/10"></div>
        
        <div className="relative pt-12 sm:pt-16 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-end">
          <img src={worker.avatarUrl} alt={worker.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover" />
          
          <div className="flex-1 space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">{worker.name}</h1>
            <p className="text-lg font-medium text-[#6B46C1]">{worker.title}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2 pt-1">
              <span className="flex items-center gap-1"><FiMapPin /> {worker.location}</span>
              <span className="flex items-center gap-1"><FiClock /> {worker.availability}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-[#6B46C1] text-[#6B46C1] font-semibold rounded-xl hover:bg-purple-50 transition-colors">
              <FiMessageSquare /> Message
            </button>
            <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-8 py-2.5 bg-[#6B46C1] text-white font-semibold rounded-xl hover:bg-[#553C9A] transition-colors shadow-sm shadow-[#6B46C1]/30">
              Hire Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Stats</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2"><FiStar className="text-yellow-500" /> Rating</span>
                  <span className="font-bold text-gray-900">{worker.rating} ({worker.reviewsCount})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2"><FiBriefcase className="text-blue-500" /> Jobs</span>
                  <span className="font-bold text-gray-900">{worker.completedJobs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Success</span>
                  <span className="font-bold text-gray-900">{worker.successRate}%</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="font-medium text-gray-900">Hourly Rate</span>
                  <span className="font-bold text-lg text-[#6B46C1]">${worker.hourlyRate}/hr</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-700 text-sm font-medium rounded-lg transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - About, Portfolio, Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{worker.about}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {worker.portfolio.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url} 
                  className="block p-4 border border-gray-200 rounded-xl hover:border-[#6B46C1] hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 bg-purple-100 text-[#6B46C1] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FiBriefcase />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#6B46C1] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">View project</p>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Client Reviews</h2>
            <div className="space-y-6 divide-y divide-gray-100">
              {worker.reviews.map((review) => (
                <div key={review.id} className="pt-6 first:pt-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{review.clientName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-xs font-bold text-yellow-700">
                      <FiStar className="fill-current" /> {review.rating}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-3 italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
