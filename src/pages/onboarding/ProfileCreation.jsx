import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaSpinner, FaUserCircle } from 'react-icons/fa';
import axiosClient from '../../api/axiosClient';
import { setUserData } from '../../features/user/userSlice';
import { ROUTES } from '../../routes/paths';

const ProfileCreation = () => {
  const { role } = useSelector((state) => state.user);
  
  // Worker fields
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('entry');
  
  // Hirer fields
  const [companyName, setCompanyName] = useState('');
  const [about, setAbout] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleComplete = async () => {
    setLoading(true);
    setError('');
    try {
      // Note: Ideally here we would call a PATCH /api/v1/profile endpoint to save bio/company details.
      // Since that endpoint isn't defined yet, we proceed to complete the onboarding step.
      const { data } = await axiosClient.patch('/onboarding/complete');
      dispatch(setUserData(data.data.user));
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete onboarding');
    } finally {
      setLoading(false);
    }
  };

  const isWorker = role === 'worker';

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-3xl mx-auto h-full text-center pb-12 pt-6">
      <div className="bg-white/10 p-4 rounded-full mb-4">
        <FaUserCircle className="text-4xl text-blue-400" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-3">Complete Your Profile</h2>
      <p className="text-white/70 mb-8 max-w-xl mx-auto">
        {isWorker 
          ? "Add a few more details to make your profile stand out to clients." 
          : "Tell us a bit about your company to attract the best talent."}
      </p>

      <div className="w-full bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 mb-8 text-left space-y-6">
        {isWorker ? (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/80">Professional Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell clients about yourself, your experience, and what you can do for them..."
                rows={4}
                className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">Hourly Rate ($)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/80">Company Name (Optional)</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/80">About Company</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="What does your company do?"
                rows={4}
                className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
          </>
        )}
      </div>

      {error && <p className="text-red-400 mb-6">{error}</p>}

      <button
        onClick={handleComplete}
        disabled={loading}
        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          !loading
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] text-white'
            : 'bg-white/10 text-white/30 cursor-not-allowed'
        }`}
      >
        {loading ? <FaSpinner className="animate-spin" /> : 'Complete Setup'}
        {!loading && <FaCheck />}
      </button>
    </div>
  );
};

export default ProfileCreation;
