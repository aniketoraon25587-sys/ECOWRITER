import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  "Analyzing product details...",
  "Researching competitor keywords...",
  "Drafting persuasive copy...",
  "Formatting for platforms...",
  "Finalizing output..."
];

export const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-4">
      {/* Animated Brain/Core */}
      <div className="relative w-32 h-32 mb-12">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full border-t-4 border-l-4 border-primary shadow-[0_0_40px_rgba(99,102,241,0.5)]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute inset-2 rounded-full border-b-4 border-r-4 border-secondary shadow-[0_0_40px_rgba(168,85,247,0.5)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center animate-pulse">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI</span>
            </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4 w-full max-w-md">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: index === currentStep ? 1 : index < currentStep ? 0.5 : 0.2,
              x: 0,
              scale: index === currentStep ? 1.05 : 1
            }}
            className="flex items-center gap-3"
          >
            <div className={`w-3 h-3 rounded-full ${index <= currentStep ? 'bg-green-400' : 'bg-gray-700'}`} />
            <span className={`text-lg font-medium ${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
