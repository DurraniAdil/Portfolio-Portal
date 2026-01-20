import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './components/HeroSection';
import GuidanceSection from './components/GuidanceSection';
import SplitSection from './components/SplitSection';
import NavigationDots from './components/NavigationDots';
import LoadingScreen from './components/LoadingScreen';
import { Side } from './types';

const SECTION_COUNT = 3;
const SCROLL_THRESHOLD = 30;
const SCROLL_COOLDOWN = 800;

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSide, setSelectedSide] = useState<Side | null>(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  const handleScroll = useCallback((direction: 'up' | 'down') => {
    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

    // Block scrolling down from section 1 - must use boxes or nav dots
    if (currentSection === 1 && direction === 'down') return;

    if (direction === 'down' && currentSection < SECTION_COUNT - 1) {
      setCurrentSection(prev => prev + 1);
      lastScrollTime.current = now;
    } else if (direction === 'up' && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      lastScrollTime.current = now;
    }
  }, [currentSection]);

  const onScrollTo = (index: number) => {
    setCurrentSection(index);
    setSelectedSide(null); // Reset side when navigating via dots
    lastScrollTime.current = Date.now();
  };

  const onNavigateWithSide = (side: Side) => {
    setSelectedSide(side);
    setCurrentSection(2);
    lastScrollTime.current = Date.now();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 10) {
        handleScroll(e.deltaY > 0 ? 'down' : 'up');
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > SCROLL_THRESHOLD) {
        handleScroll(deltaY > 0 ? 'down' : 'up');
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') handleScroll('down');
      if (e.key === 'ArrowUp') handleScroll('up');
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleScroll, isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <AnimatePresence>
        {!isLoading && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-screen overflow-hidden bg-void-black text-white relative"
          >
            <NavigationDots currentSection={currentSection} onScrollTo={onScrollTo} />

            <motion.div
              animate={{ y: `-${currentSection * 100}%` }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
                mass: 1,
                restDelta: 0.001
              }}
              className="w-full h-full"
            >
              <div className="w-full h-full">
                <HeroSection />
              </div>
              <div className="w-full h-full">
                <GuidanceSection onScrollTo={onScrollTo} onNavigateWithSide={onNavigateWithSide} />
              </div>
              <div className="w-full h-full">
                <SplitSection initialSide={selectedSide} />
              </div>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;