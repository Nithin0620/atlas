'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, Pause, Mic, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function VoiceHeroDemo() {
  const [isActive, setIsActive] = useState(false);

  const toggleSimulation = () => {
    setIsActive(!isActive);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  return (
    <section className="relative pt-44 pb-24 md:pt-52 md:pb-32 overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center max-w-5xl mx-auto space-y-10"
        >
          {/* Top Feature Pill */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-white/70 tracking-wide">
              <span>Atlas v2.0 &middot; Ultra Low-Latency Voice AI Learning</span>
            </div>
          </motion.div>

          {/* Hero Title */}
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05] text-white">
            Master Any Subject with <br className="hidden md:inline" />
            <span className="italic font-light">Live Voice AI</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg sm:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            Atlas pairs natural, full-duplex conversational voice tutoring with real-time synchronized visual companions.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/sign-up"
              className="px-8 py-4 rounded-full text-base btn-premium inline-flex items-center gap-2 group"
            >
              <span>Start Learning Free</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={toggleSimulation}
              className="px-8 py-4 rounded-full text-base btn-premium-dark inline-flex items-center gap-2.5"
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Demo</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Interactive Voice Preview</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Interactive Voice AI Orb / Waveform Simulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="rounded-[32px] bg-white/[0.02] border border-white/10 p-8 sm:p-12 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.04]">
            <div className="flex flex-col items-center justify-center text-center space-y-8">

              <div
                onClick={toggleSimulation}
                className="relative cursor-pointer flex items-center justify-center h-32 w-full max-w-xs"
              >
                {isActive ? (
                  <div className="flex items-end gap-1.5 h-16">
                    {[0.6, 1, 0.4, 0.8, 0.5, 0.9, 0.3].map((height, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ['20%', `${height * 100}%`, '20%'] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                        className="w-1.5 bg-white rounded-full"
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center"
                  >
                    <Mic className="w-8 h-8 text-white/50" />
                  </motion.div>
                )}
              </div>

              <div>
                <p className="text-lg font-medium text-white">
                  {isActive ? 'AI Mentor Explaining...' : 'Tap to start voice'}
                </p>
                <p className="text-sm text-white/50 mt-2 font-mono uppercase tracking-widest">
                  {isActive ? 'Dual-stream active' : 'Sub-second real-time speech'}
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Feature Badges - Minimal rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] as any }}
          className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6 max-w-4xl mx-auto border-t border-white/10 pt-10"
        >
          {[
            { label: 'Sub-400ms Voice Latency' },
            { label: 'Live Visual Companion' },
            { label: 'True Cross-Platform' },
            { label: 'Long-Term Memory' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-white/70"
            >
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
