import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserTie, FaBriefcase, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axiosClient from '../../api/axiosClient';
import { setUserData } from '../../features/user/userSlice';
import { ROUTES } from '../../routes/paths';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinue = async () => {
    if (!selectedRole) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosClient.patch('/onboarding/role', { role: selectedRole });
      dispatch(setUserData(data.data.user));
      navigate(ROUTES.ONBOARDING_LOCATION);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto h-full text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">How would you like to use FreeLanzo?</h2>
      <p className="text-lg text-white/70 mb-12 max-w-xl mx-auto">
        Join our thriving community as a freelancer looking for work or a client seeking top talent.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
        {/* Worker Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedRole('worker')}
          className={`cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-6 backdrop-blur-sm ${
            selectedRole === 'worker'
              ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]'
              : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
          }`}
        >
          <div className={`p-6 rounded-full transition-colors duration-300 ${selectedRole === 'worker' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/50'}`}>
            <FaBriefcase className="text-4xl" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">I Want Work</h3>
            <p className="text-sm text-white/60">Find exciting projects, build your portfolio, and grow your freelance career.</p>
          </div>
        </motion.div>

        {/* Hirer Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedRole('hirer')}
          className={`cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-6 backdrop-blur-sm ${
            selectedRole === 'hirer'
              ? 'bg-pink-500/20 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)]'
              : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
          }`}
        >
          <div className={`p-6 rounded-full transition-colors duration-300 ${selectedRole === 'hirer' ? 'bg-pink-500 text-white' : 'bg-white/10 text-white/50'}`}>
            <FaUserTie className="text-4xl" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">I Want To Hire</h3>
            <p className="text-sm text-white/60">Post jobs, browse talented freelancers, and get your projects done.</p>
          </div>
        </motion.div>
      </div>

      {error && <p className="text-red-400 mb-6">{error}</p>}

      <button
        onClick={handleContinue}
        disabled={!selectedRole || loading}
        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          selectedRole && !loading
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] text-white'
            : 'bg-white/10 text-white/30 cursor-not-allowed'
        }`}
      >
        {loading ? <FaSpinner className="animate-spin" /> : 'Continue'}
        {!loading && <FaArrowRight />}
      </button>
    </div>
  );
};

export default RoleSelection;
