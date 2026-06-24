import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../routes/paths';
import { FaCheck } from 'react-icons/fa';

const OnboardingLayout = () => {
  const { role } = useSelector((state) => state.user);
  const location = useLocation();

  const getSteps = () => {
    const base = [
      { path: ROUTES.ONBOARDING_ROLE, label: 'Role' },
      { path: ROUTES.ONBOARDING_LOCATION, label: 'Location' },
    ];
    if (role === 'worker') {
      base.push({ path: ROUTES.ONBOARDING_SKILLS, label: 'Skills' });
    }
    base.push({ path: ROUTES.ONBOARDING_PROFILE, label: 'Profile' });
    return base;
  };

  const steps = getSteps();
  const currentStepIndex = steps.findIndex(s => s.path === location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#16213E] flex flex-col font-sans text-white overflow-x-hidden">
      {/* Top Bar */}
      <div className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          FreeLanzo
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-10 p-6 z-10 w-full max-w-4xl mx-auto">
        {/* Progress Tracker */}
        <div className="w-full mb-12 flex items-center justify-center">
          <div className="flex items-center gap-2 md:gap-4 w-full max-w-2xl">
            {steps.map((step, index) => {
              const isCompleted = currentStepIndex > index;
              const isActive = currentStepIndex === index;
              return (
                <React.Fragment key={step.path}>
                  <div className="flex flex-col items-center gap-2 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-10 ${
                      isActive ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]' :
                      isCompleted ? 'bg-green-500' : 'bg-white/10 text-white/50'
                    }`}>
                      {isCompleted ? <FaCheck /> : index + 1}
                    </div>
                    <span className={`absolute top-12 text-xs font-semibold whitespace-nowrap ${isActive ? 'text-white' : 'text-white/50'} hidden md:block`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" 
                        style={{ width: isCompleted ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full flex-1 flex flex-col mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1 flex flex-col"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default OnboardingLayout;
