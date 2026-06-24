import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowRight, FaSpinner, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axiosClient from '../../api/axiosClient';
import { setUserData } from '../../features/user/userSlice';
import { ROUTES } from '../../routes/paths';
import { SKILL_CATEGORIES } from '../../constants/skillCategories';

const SkillsSetup = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleContinue = async () => {
    if (selectedSkills.length === 0) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosClient.patch('/onboarding/skills', { skills: selectedSkills });
      dispatch(setUserData(data.data.user));
      navigate(ROUTES.ONBOARDING_PROFILE);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update skills');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto h-full text-center pb-8 pt-4">
      <div className="bg-white/10 p-4 rounded-full mb-6">
        <FaLightbulb className="text-4xl text-yellow-400" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">What are your skills?</h2>
      <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
        Select the categories that best describe your expertise. This helps us match you with the right jobs.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-h-[40vh] overflow-y-auto p-4 custom-scrollbar">
        {SKILL_CATEGORIES.map(skill => {
          const isSelected = selectedSkills.includes(skill);
          return (
            <motion.button
              key={skill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSkill(skill)}
              className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent shadow-[0_0_15px_rgba(236,72,153,0.4)] text-white'
                  : 'bg-white/5 border-white/20 text-white/70 hover:border-white/50 hover:bg-white/10'
              }`}
            >
              {skill}
            </motion.button>
          );
        })}
      </div>

      {error && <p className="text-red-400 mb-6">{error}</p>}

      <button
        onClick={handleContinue}
        disabled={selectedSkills.length === 0 || loading}
        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
          selectedSkills.length > 0 && !loading
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

export default SkillsSetup;
