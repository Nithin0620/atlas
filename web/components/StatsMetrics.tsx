'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function StatsMetrics() {
  const pillars = [
    {
      num: '01',
      title: 'Sub-400ms Audio Pipeline',
      desc: 'Full-duplex real-time audio pipeline powered by Vapi AI and Deepgram Nova with instant interruption support.',
    },
    {
      num: '02',
      title: 'Unified REST Architecture',
      desc: 'Shared Next.js REST Route Handlers consumed identically by both the Web dashboard and the React Native mobile app.',
    },
    {
      num: '03',
      title: 'Persistent Memory & Debriefs',
      desc: 'MongoDB document store tracking session transcripts, knowledge gap metrics, and spaced-repetition card decks.',
    },
    {
      num: '04',
      title: 'Cross-Platform Native Experience',
      desc: 'Seamless Expo mobile client with native background audio and lock screen call controls for hands-free study.',
    },
  ];

  return (
    <section id="architecture" className="relative bg-white text-primary-dark py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-dark/50">
            <span>03 &mdash; Core Architecture</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Engineered for Precision
          </h2>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col space-y-6"
            >
              <div className="text-6xl sm:text-7xl font-black text-primary-dark">
                {pillar.num}
              </div>
              <div className="w-full h-px bg-primary-dark/10" />
              <div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-base text-primary-dark/60 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
