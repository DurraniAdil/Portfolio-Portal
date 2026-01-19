import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAS } from '../constants';
import StarBackground from './StarBackground';
import TypewriterText from './TypewriterText';
import { ChevronsDown } from 'lucide-react';

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PERSONAS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PERSONAS.length) % PERSONAS.length);
  };

  const currentPersona = PERSONAS[currentIndex];

  return (
    <section id="section-0" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-void-black text-white">
      {/*  transition */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentPersona.id + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentPersona.bgGradient} opacity-60 z-0`}
        />
      </AnimatePresence>

      <StarBackground primaryColor={currentPersona.themeColor} />

      {/* line */}
      <div className="scanline z-10" />

      {/* opening text */}
      <div className="relative z-20 w-full max-w-6xl px-6 flex flex-col items-center justify-center h-full">

        {/* header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-8 md:top-12 text-center"
        >
          <h1 className="text-xl md:text-2xl font-display tracking-[0.3em] uppercase text-cyan-200/70">
            A Universe of Personas
          </h1>
          <div className="h-0.5 w-24 bg-cyan-500/50 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </motion.div>

        {/* carousel */}
        <div className="flex items-center justify-center w-full h-[60vh] relative">

          {/* slide */}
          <div className="flex-1 h-full relative flex items-center justify-center overflow-visible">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    handleNext();
                  } else if (swipe > swipeConfidenceThreshold) {
                    handlePrev();
                  }
                }}
                className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-4xl cursor-grab active:cursor-grabbing touch-pan-y"
              >
                {/* character */}
                <div className="relative group pointer-events-none md:pointer-events-auto">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse-slow"
                    style={{ backgroundColor: currentPersona.themeColor }}
                  />
                  <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-sm">
                    <img
                      src={currentPersona.imageUrl}
                      alt={currentPersona.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* rings */}
                  <div className="absolute -inset-4 border border-white/10 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
                  <div className="absolute -inset-8 border border-white/5 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
                </div>

                {/* text */}
                <div className="text-center md:text-left max-w-lg pointer-events-none md:pointer-events-auto">
                  <h2
                    className="text-4xl md:text-6xl font-display font-bold mb-4 uppercase tracking-wider"
                    style={{ textShadow: `0 0 20px ${currentPersona.themeColor}80` }}
                  >
                    <TypewriterText
                      key={`title-${currentIndex}`}
                      text={currentPersona.title}
                      speed={60}
                      delay={200}
                    />
                  </h2>
                  <p className="text-lg md:text-2xl text-white/80 font-light tracking-wide font-body">
                    <TypewriterText
                      key={`tagline-${currentIndex}`}
                      text={currentPersona.tagline}
                      speed={30}
                      delay={800}
                    />
                  </p>

                  {/* decoration */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mt-6"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        <div className="flex space-x-2 mt-8 md:mt-0 z-30">
          {PERSONAS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to persona ${idx + 1}`}
            />
          ))}
        </div>

        {/* scroller */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 flex flex-col items-center opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] mb-2">Initialize Sequence</span>
          <ChevronsDown className="w-6 h-6" />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;