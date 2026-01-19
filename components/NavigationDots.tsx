import React from 'react';
import { motion } from 'framer-motion';

interface NavigationDotsProps {
  currentSection: number;
  onScrollTo: (index: number) => void;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ currentSection, onScrollTo }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50 pointer-events-auto">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          onClick={() => onScrollTo(index)}
          className="group relative flex items-center justify-center w-4 h-4"
          aria-label={`Scroll to section ${index + 1}`}
        >
          <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase tracking-widest text-white/70 whitespace-nowrap bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
            {index === 0 ? 'Personas' : index === 1 ? 'Guidance' : 'Path'}
          </span>

          {currentSection === index && (
            <motion.div
              layoutId="activeRing"
              className="absolute w-6 h-6 rounded-full border border-neon-blue/50"
              transition={{ duration: 0.3 }}
            />
          )}

          {/* dots */}
          <div
            className={`rounded-full transition-all duration-300 ${currentSection === index
              ? 'w-2 h-2 bg-neon-blue shadow-[0_0_10px_#00e5ff]'
              : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/80'
              }`}
          />
        </button>
      ))}
    </div>
  );
};

export default NavigationDots;