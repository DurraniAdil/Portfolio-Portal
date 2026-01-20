import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '../utils/assetPath';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = React.useState(true);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setTimeout(onComplete, 500);
  };



  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src={getAssetPath('media/loading-screen.mp4')} type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;