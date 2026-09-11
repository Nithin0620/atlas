'use client';

import React from 'react';
import { Zap, Globe, Database, Smartphone } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function StatsMetrics() {
  const pillars = [
    {
      num: '01',
      title: 'Sub-400ms Audio Pipeline',
      desc: 'Full-duplex real-time audio pipeline powered by Vapi AI and Deepgram Nova with instant interruption support.',
      icon: <Zap className="w-5 h-5 text-white" />,
    },
    {
      num: '02',
      title: 'Unified REST Architecture',
      desc: 'Shared Next.js REST Route Handlers consumed identically by both the Web dashboard and the React Native mobile app.',
      icon: <Globe className="w-5 h-5 text-white" />,
    },
    {
      num: '03',
      title: 'Persistent Memory & Debriefs',
      desc: 'MongoDB document store tracking session transcripts, knowledge gap metrics, and spaced-repetition card decks.',
      icon: <Database className="w-5 h-5 text-white" />,
    },
    {
      num: '04',
      title: 'Cross-Platform Native Experience',
      desc: 'Seamless Expo mobile client with native background audio and lock screen call controls for hands-free study.',
      icon: <Smartphone className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section id="architecture" className="relative py-24 md:py-32 glass-section border-t border-white/50 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto space-y-3">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/60 glass px-3.5 py-1.5 text-xs font-semibold tracking-wider text-slate-700 shadow-sm overflow-hidden animate-shimmer">
            <span>03 &middot; CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-sky-600 bg-clip-text text-transparent animate-gradient-text">
              Engineered for Real-Time Precision
            </span>
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Clean architectural separation between real-time voice streaming, state synchronization, and mobile clients.
          </p>
        </Reveal>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <Reveal key={pillar.num} delay={idx * 90} className="h-full">
              <div
                className="rounded-2xl modern-card glow-border p-6 space-y-4 flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <span className="font-mono font-bold text-xs text-slate-400">
                      {pillar.num}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center shadow-sm animate-glow-pulse">
                      {pillar.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-950 mt-4">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 text-[11px] font-semibold text-slate-400">
                  Active System Module
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
