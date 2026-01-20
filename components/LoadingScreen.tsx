import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../utils/assetPath';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Progress through steps: 0 -> 1 -> 2 -> 3 (complete)
  // On mobile, last image stays shorter (500ms)
  useEffect(() => {
    const advanceStep = () => {
      setStep(prev => {
        if (prev >= 3) {
          setTimeout(onComplete, 300);
          return prev;
        }
        // Schedule next step - shorter delay for last step on mobile
        const nextDelay = (prev === 2 && isMobile) ? 800 : 1000;
        setTimeout(advanceStep, nextDelay);
        return prev + 1;
      });
    };

    // Start after initial delay
    const initialTimer = setTimeout(advanceStep, 1000);
    return () => clearTimeout(initialTimer);
  }, [onComplete, isMobile]);

  const images = [
    getAssetPath('media/loading-1.png'),
    getAssetPath('media/loading-2.png'),
    getAssetPath('media/loading-3.png'),
  ];

  // Mobile: Full viewport carousel
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#E0DFDC] overflow-hidden">
        <AnimatePresence mode="wait">
          {step <= 3 && (
            <motion.img
              key={step < 3 ? step : 2}
              src={images[step < 3 ? step : 2]}
              alt={`Loading ${(step < 3 ? step : 2) + 1}`}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop: Staged fade-in
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <div className="flex items-center justify-center gap-8 px-12">
        {/* Left image (loading-2) - appears second */}
        <motion.img
          src={images[1]}
          alt="Loading 2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="w-1/4 max-w-xs object-contain"
        />

        {/* Center image (loading-1) - appears first */}
        <motion.img
          src={images[0]}
          alt="Loading 1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.9 }}
          transition={{ duration: 0.5 }}
          className="w-1/3 max-w-md object-contain"
        />

        {/* Right image (loading-3) - appears third */}
        <motion.img
          src={images[2]}
          alt="Loading 3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="w-1/4 max-w-xs object-contain"
        />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;