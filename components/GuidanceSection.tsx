import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAssetPath } from '../utils/assetPath';
import { Side } from '../types';

interface GuidanceSectionProps {
  onScrollTo: (index: number) => void;
  onNavigateWithSide: (side: Side) => void;
}

const GuidanceSection: React.FC<GuidanceSectionProps> = ({ onScrollTo, onNavigateWithSide }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const osVideoRef = useRef<HTMLVideoElement>(null);
  const appVideoRef = useRef<HTMLVideoElement>(null);

  // Sync videos when section becomes visible
  useEffect(() => {
    const syncVideos = () => {
      if (osVideoRef.current && appVideoRef.current) {
        osVideoRef.current.currentTime = 0;
        appVideoRef.current.currentTime = 0;
        osVideoRef.current.play().catch(() => { });
        appVideoRef.current.play().catch(() => { });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay to ensure smooth transition
            setTimeout(syncVideos, 100);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-1"
      className="relative w-full h-screen overflow-hidden bg-void-black text-white flex flex-col items-center justify-center px-4 md:px-6"
    >
      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/50 to-black z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">

        {/* title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-400/70 mb-3">
            Choose Your Interface
          </h2>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Two Paths. One Journey.
          </h1>
        </motion.div>

        {/* video boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

          {/* os video box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative"
          >
            <div
              onClick={() => onNavigateWithSide(Side.OS)}
              className="relative rounded-xl overflow-hidden border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300 bg-black cursor-pointer"
            >
              <video
                ref={osVideoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-48 md:h-64 lg:h-72 object-cover pointer-events-none"
              >
                <source src={getAssetPath('media/os-guide.mp4')} type="video/mp4" />
              </video>

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              {/* text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
                <h3 className="text-xl md:text-2xl font-display font-bold text-green-400 mb-1">
                  OS Portfolio
                </h3>
                <p className="text-xs md:text-sm text-gray-400">
                  Desktop Experience
                </p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[inset_0_0_40px_rgba(34,197,94,0.2)]" />
            </div>
          </motion.div>

          {/* app video box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative"
          >
            <div
              onClick={() => onNavigateWithSide(Side.APP)}
              className="relative rounded-xl overflow-hidden border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 bg-black cursor-pointer"
            >
              <video
                ref={appVideoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-48 md:h-64 lg:h-72 object-cover pointer-events-none"
              >
                <source src={getAssetPath('media/app-guide.mp4')} type="video/mp4" />
              </video>

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              {/* text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
                <h3 className="text-xl md:text-2xl font-display font-bold text-yellow-400 mb-1">
                  App Portfolio
                </h3>
                <p className="text-xs md:text-sm text-gray-400">
                  Mobile Experience
                </p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[inset_0_0_40px_rgba(234,179,8,0.2)]" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default GuidanceSection;