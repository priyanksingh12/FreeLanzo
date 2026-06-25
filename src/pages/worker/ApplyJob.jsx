import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiDollarSign, FiPaperclip, FiSend } from "react-icons/fi";
import { jobsMock } from "../../mocks/jobs.mock";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  // Find job from mock data, or default to first if not found (just for UI demo purposes)
  const job = jobsMock.find((j) => j.id === jobId) || jobsMock[0];

  const [formData, setFormData] = useState({
    budget: "",
    duration: "",
    coverLetter: "",
    portfolioUrl: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/worker/dashboard");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft /> Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Details Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Job Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Title</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{job.title}</p>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Budget</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">${job.budget}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Experience</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{job.experienceLevel}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Client</p>
                <div className="flex items-center gap-2 mt-2">
                  <img src={job.hirer.avatarUrl} alt={job.hirer.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{job.hirer.name}</p>
                    <p className="text-xs text-gray-500">{job.hirer.rating} ⭐</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Required Skills</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit Proposal</h1>
            <p className="text-sm text-gray-500 mb-8">Set your terms and tell the client why you're a great fit for this project.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Proposed Budget ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder={job.budget.toString()}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Duration
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiClock className="text-gray-400" />
                    </div>
                    <select
                      name="duration"
                      required
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>Select duration</option>
                      <option value="1_week">Less than 1 week</option>
                      <option value="1_month">1 to 4 weeks</option>
                      <option value="3_months">1 to 3 months</option>
                      <option value="6_months">3 to 6 months</option>
                      <option value="more">More than 6 months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  required
                  rows="6"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Introduce yourself and explain why you're the best candidate for this job..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio URL (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPaperclip className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2.5 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-2.5 bg-[#6B46C1] text-white font-semibold rounded-xl hover:bg-[#553C9A] focus:ring-4 focus:ring-purple-100 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" /> Submit Proposal
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
