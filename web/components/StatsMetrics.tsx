'use client';

import React from 'react';
import { Zap, Globe, Database, Smartphone } from 'lucide-react';

export function StatsMetrics() {
  const pillars = [
    {
      num: '01',
      title: 'Sub-400ms Audio Pipeline',
      desc: 'Full-duplex real-time audio pipeline powered by Vapi AI and Deepgram Nova with instant interruption support.',
      icon: <Zap className="w-5 h-5 text-black" />,
    },
    {
      num: '02',
      title: 'Unified REST Architecture',
      desc: 'Shared Next.js REST Route Handlers consumed identically by both the Web dashboard and the React Native mobile app.',
      icon: <Globe className="w-5 h-5 text-black" />,
    },
    {
      num: '03',
      title: 'Persistent Memory & Debriefs',
      desc: 'MongoDB document store tracking session transcripts, knowledge gap metrics, and spaced-repetition card decks.',
      icon: <Database className="w-5 h-5 text-black" />,
    },
    {
      num: '04',
      title: 'Cross-Platform Native Experience',
      desc: 'Seamless Expo mobile client with native background audio and lock screen call controls for hands-free study.',
      icon: <Smartphone className="w-5 h-5 text-black" />,
    },
  ];

  return (
    <section id="architecture" className="relative z-20 overflow-hidden">
      {/* Top Seamless Faded Mixing Zone (#01001a to White) */}
      <div className="h-28 sm:h-44 w-full bg-gradient-to-b from-[#01001a] via-[#01001a]/60 via-40% to-white pointer-events-none" />

      {/* Main Solid White Content Body */}
      <div className="bg-white text-black py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-neutral-600 shadow-sm">
              <span>02 • CORE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight">
              Engineered for Real-Time Precision
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed">
              Clean architectural separation between real-time voice streaming, state management, and mobile clients.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="rounded-2xl border border-neutral-200 bg-[#fbfbfb] p-6 sm:p-7 space-y-4 hover:border-black hover:bg-white transition-all duration-200 hover:shadow-xl group"
              >
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                    {pillar.num}
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
                    {pillar.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-black group-hover:text-black">
                  {pillar.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Seamless Faded Mixing Zone (White to #01001a) */}
      <div className="h-28 sm:h-44 w-full bg-gradient-to-b from-white via-[#01001a]/60 via-60% to-[#01001a] pointer-events-none" />
    </section>
  );
}
