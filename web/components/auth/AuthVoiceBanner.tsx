'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Sparkles, Bot, Zap, Star } from 'lucide-react';

export function AuthVoiceBanner({ mode = 'sign-in' }: { mode?: 'sign-in' | 'sign-up' }) {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 5);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px] lg:min-h-screen flex flex-col justify-between p-8 lg:p-12 overflow-hidden bg-black text-white select-none border-l border-neutral-800">
      {/* Subtle modern ambient background mesh */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Top Tag & Status */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-neutral-200">
            Atlas Voice AI v2.0
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-800">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>&lt;350ms Duplex Speech</span>
        </div>
      </div>

      {/* Centerpiece: Glowing Minimalist Voice Orb & Interactive Live Card */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-8 py-6 w-full max-w-md mx-auto">
        {/* Glowing Orb with Sound Waves */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Outer Pulsing Ring */}
          <div className="absolute w-52 h-52 rounded-full bg-white/[0.04] blur-xl animate-pulse" />
          <div className="absolute w-40 h-40 rounded-full border border-neutral-800 animate-[spin_16s_linear_infinite]" />

          {/* Voice Orb */}
          <div className="relative w-28 h-28 rounded-full bg-neutral-900 border border-neutral-700 shadow-2xl flex flex-col items-center justify-center space-y-1.5">
            <div className="flex items-end gap-1 h-7">
              {[40, 80, 100, 60, 90, 45, 75].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-white rounded-full"
                  style={{
                    height: `${((h + pulseIndex * 15) % 100) + 20}%`,
                    transition: 'height 0.2s ease',
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400">
              <Mic className="w-3 h-3 text-white animate-bounce" />
              <span>VOICE ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Live Conversation Simulation Card */}
        <div className="w-full rounded-2xl bg-neutral-900/90 border border-neutral-800 p-5 shadow-2xl space-y-4">
          {/* User Spoken Prompt */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              You
            </div>
            <div className="flex-1 bg-neutral-950 border border-neutral-800/80 rounded-2xl rounded-tl-sm p-3 text-xs text-neutral-300 leading-relaxed">
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono mb-1">
                <Volume2 className="w-3 h-3" />
                <span>Spoken Query (0.2s ago)</span>
              </div>
              &ldquo;Atlas, how does self-attention compute context weights in Transformers?&rdquo;
            </div>
          </div>

          {/* AI Mentor Response */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-2xl rounded-tl-sm p-3 text-xs text-neutral-300 leading-relaxed">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-[10px] text-white font-semibold">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Dr. Turing (Atlas AI Mentor)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-mono">
                  Synthesizing
                </span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                &ldquo;Each token casts queries to match keys and scale dot products with values:&rdquo;
              </p>

              {/* Real-time Math Sync */}
              <div className="mt-2.5 p-2 rounded-xl bg-black border border-neutral-800 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                <span>Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V</span>
                <span className="text-[9px] text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">LaTeX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
          {[
            'Conversational Voice AI',
            'Synchronized Visuals',
            'Cross-Device Sync',
            'Active Memory',
          ].map((label, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-medium text-neutral-300"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Highlights */}
      <div className="relative z-10 pt-4 border-t border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 text-white">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-white" />
            ))}
          </div>
          <p className="text-xs text-neutral-300 font-medium">Loved by 10,000+ learners</p>
        </div>

        <div className="text-right">
          <p className="text-xs font-semibold text-white">Full-Duplex Audio</p>
          <p className="text-[10px] text-neutral-400">Next-gen AI tutoring</p>
        </div>
      </div>
    </div>
  );
}
