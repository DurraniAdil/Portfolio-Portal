import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, ArrowRight, ExternalLink, Minimize2 } from 'lucide-react';
import { LINKS, PERSONAS } from '../constants';
import { Side } from '../types';

const SplitSection: React.FC = () => {
  const [expandedSide, setExpandedSide] = useState<Side | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const appPersona = PERSONAS.find(p => p.id === 'hrpm') || PERSONAS[1];
  const osPersona = PERSONAS.find(p => p.id === 'webdev') || PERSONAS[2];

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 20;
    const y = (clientY / height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleExpand = (side: Side) => {
    setExpandedSide(side);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSide(null);
  };

  return (
    <section
      id="section-2"
      className="relative w-full h-screen overflow-hidden bg-void-black flex flex-col md:flex-row"
      onMouseMove={handleMouseMove}
    >

      {/* app side on left and top*/}
      <motion.div
        className={`relative flex flex-col items-center justify-center overflow-hidden cursor-pointer group transition-colors duration-500
          ${expandedSide === Side.OS ? 'md:w-[10%] w-full h-[15%] md:h-full bg-yellow-950/20 border-b md:border-b-0 md:border-r border-yellow-500/20' : ''}
          ${expandedSide === Side.APP ? 'md:w-[90%] w-full h-[85%] md:h-full bg-black' : ''}
          ${expandedSide === null ? 'md:w-1/2 w-full h-1/2 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-yellow-950/40 to-black hover:from-yellow-900/50' : ''}
        `}
        layout
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        onClick={() => handleExpand(Side.APP)}
      >
        {/* background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${expandedSide === Side.APP ? 'opacity-40 scale-105' : 'opacity-20 grayscale'}`}
          style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px) scale(1.1)` }}
        >
          <source src="/media/app-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <AnimatePresence mode='wait'>
          {/* when collapsed */}
          {expandedSide === Side.OS && (
            <motion.div
              key="app-belittled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex md:flex-col flex-row items-center justify-center p-4"
            >
              <Smartphone className="w-6 h-6 text-yellow-500/50 mb-0 md:mb-4 mr-4 md:mr-0" />
              <span className="text-yellow-500/50 text-xs md:text-sm font-display tracking-widest uppercase whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180">
                Switch to App Path
              </span>
            </motion.div>
          )}

          {/* OG state */}
          {expandedSide === null && (
            <motion.div
              key="app-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="z-10 text-center p-6"
              style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
            >
              <div className="w-20 h-20 rounded-full border-2 border-yellow-500/50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-yellow-500 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300 bg-black/50 backdrop-blur-sm overflow-hidden">
                <img src="/media/port-app.png" className="w-full h-full object-cover opacity-80" alt="App Agent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 uppercase tracking-widest" style={{ textShadow: `0 0 10px ${appPersona.themeColor}` }}>
                App Path
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto mb-6">
                The handheld communicator interface.
              </p>
              <div className="inline-flex items-center text-yellow-500 text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          )}

          {/* expanded */}
          {expandedSide === Side.APP && (
            <motion.div
              key="app-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="z-10 flex flex-col items-center justify-center h-full max-w-4xl px-8 text-center"
            >
              <button
                onClick={handleReset}
                className="absolute top-8 left-8 p-2 text-white/50 hover:text-white flex items-center text-xs uppercase tracking-widest"
              >
                <Minimize2 className="w-4 h-4 mr-2" /> Reset View
              </button>

              <div className="w-32 h-32 rounded-full border-4 border-yellow-500 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(234,179,8,0.6)] bg-black/80 overflow-hidden">
                <img src="/media/port-app.png" className="w-full h-full object-cover" alt="App Agent" />
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase" style={{ textShadow: `0 0 20px ${appPersona.themeColor}` }}>
                App Portfolio
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
                A streamlined, social-feed inspired experience designed for rapid consumption.
                Perfect for mobile devices and quick scanning of projects.
              </p>
              <a
                href={LINKS.APP_PORTFOLIO}
                className="group relative px-8 py-4 bg-yellow-500/10 border border-yellow-500 text-yellow-500 font-display tracking-widest uppercase hover:bg-yellow-500 hover:text-white transition-all duration-300 flex items-center"
              >
                <span className="absolute inset-0 bg-yellow-500/20 blur-lg group-hover:bg-yellow-500/60 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <span className="relative flex items-center">
                  Initialize App Interface <ExternalLink className="ml-3 w-5 h-5" />
                </span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* os side on right and bottom*/}
      <motion.div
        className={`relative flex flex-col items-center justify-center overflow-hidden cursor-pointer group transition-colors duration-500
          ${expandedSide === Side.APP ? 'md:w-[10%] w-full h-[15%] md:h-full bg-green-950/20 border-t md:border-t-0 md:border-l border-green-500/20' : ''}
          ${expandedSide === Side.OS ? 'md:w-[90%] w-full h-[85%] md:h-full bg-black' : ''}
          ${expandedSide === null ? 'md:w-1/2 w-full h-1/2 md:h-full bg-gradient-to-t md:bg-gradient-to-l from-green-950/40 to-black hover:from-green-900/50' : ''}
        `}
        layout
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        onClick={() => handleExpand(Side.OS)}
      >
        {/* Background Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${expandedSide === Side.OS ? 'opacity-40 scale-105' : 'opacity-20 grayscale'}`}
          style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px) scale(1.1)` }}
        >
          <source src="/media/os-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <AnimatePresence mode='wait'>
          {/* when collapsed */}
          {expandedSide === Side.APP && (
            <motion.div
              key="os-belittled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex md:flex-col flex-row items-center justify-center p-4"
            >
              <Monitor className="w-6 h-6 text-green-500/50 mb-0 md:mb-4 mr-4 md:mr-0" />
              <span className="text-green-500/50 text-xs md:text-sm font-display tracking-widest uppercase whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-0">
                Switch to OS Path
              </span>
            </motion.div>
          )}

          {/* OG state */}
          {expandedSide === null && (
            <motion.div
              key="os-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="z-10 text-center p-6"
              style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)` }}
            >
              <div className="w-20 h-20 rounded-full border-2 border-green-500/50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-green-500 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 bg-black/50 backdrop-blur-sm overflow-hidden">
                <img src="/media/port-os.png" className="w-full h-full object-cover opacity-80" alt="OS Agent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 uppercase tracking-widest" style={{ textShadow: `0 0 10px ${osPersona.themeColor}` }}>
                OS Path
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto mb-6">
                The starship console desktop system.
              </p>
              <div className="inline-flex items-center text-green-500 text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          )}

          {/* expanded */}
          {expandedSide === Side.OS && (
            <motion.div
              key="os-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="z-10 flex flex-col items-center justify-center h-full max-w-4xl px-8 text-center"
            >
              <button
                onClick={handleReset}
                className="absolute top-8 right-8 p-2 text-white/50 hover:text-white flex items-center text-xs uppercase tracking-widest"
              >
                Reset View <Minimize2 className="w-4 h-4 ml-2" />
              </button>

              <div className="w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.6)] bg-black/80 overflow-hidden">
                <img src="/media/port-os.png" className="w-full h-full object-cover" alt="OS Agent" />
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase" style={{ textShadow: `0 0 20px ${osPersona.themeColor}` }}>
                Durrani OS
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
                A fully immersive operating system simulation. Features windows, taskbars, and multitasking.
                The definitive desktop experience.
              </p>
              <a
                href={LINKS.OS_PORTFOLIO}
                className="group relative px-8 py-4 bg-green-500/10 border border-green-500 text-green-500 font-display tracking-widest uppercase hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center"
              >
                <span className="absolute inset-0 bg-green-500/20 blur-lg group-hover:bg-green-500/60 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <span className="relative flex items-center">
                  Launch System <ExternalLink className="ml-3 w-5 h-5" />
                </span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* middle box visbile or not */}
      <AnimatePresence>
        {expandedSide === null && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <div className="w-16 h-16 bg-black border-2 border-white/20 rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-green-500 opacity-80" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default SplitSection;