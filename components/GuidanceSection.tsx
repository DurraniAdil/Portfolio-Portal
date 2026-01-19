import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const GuidanceSection: React.FC = () => {
  return (
    <section
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
            <div className="relative rounded-xl overflow-hidden border-2 border-green-500/30 hover:border-green-500/60 transition-all duration-300 bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-48 md:h-64 lg:h-72 object-cover"
              >
                <source src="/media/os-guide.mp4" type="video/mp4" />
              </video>

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-display font-bold text-green-400 mb-1">
                  OS Portfolio
                </h3>
                <p className="text-xs md:text-sm text-gray-400">
                  Desktop Experience
                </p>
              </div>

              {/* Glow effect on hover */}
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
            <div className="relative rounded-xl overflow-hidden border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-48 md:h-64 lg:h-72 object-cover"
              >
                <source src="/media/app-guide.mp4" type="video/mp4" />
              </video>

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
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

        {/* scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 md:mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center text-gray-500"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] mb-2">Scroll to choose</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default GuidanceSection;