'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Sparkles, ChevronRight, Play, Pause } from 'lucide-react';
import Link from 'next/link';

export function VoiceHeroDemo() {
  const [isActive, setIsActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [speakingRole, setSpeakingRole] = useState<'idle' | 'user' | 'assistant'>('idle');

  const simulationSteps = [
    {
      role: 'user',
      text: '"Hey Atlas, how does backpropagation update weights in a deep neural network?"',
      visual: null,
    },
    {
      role: 'assistant',
      text: '"Great question! It computes the gradient of the loss with respect to each weight using the chain rule..."',
      visual: {
        type: 'formula',
        title: 'Chain Rule Gradient',
        content: '∂L/∂w = (∂L/∂ŷ) · (∂ŷ/∂z) · (∂z/∂w)',
        tag: 'LaTeX Formula',
      },
    },
    {
      role: 'assistant',
      text: '"Then we update each parameter by taking a step in the opposite direction of the gradient:"',
      visual: {
        type: 'code',
        title: 'Weight Update Step',
        content: 'w = w - learning_rate * dW\nb = b - learning_rate * db',
        tag: 'Python / PyTorch',
      },
    },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % simulationSteps.length;
          setSpeakingRole(simulationSteps[next].role as any);
          return next;
        });
      }, 3500);
    } else {
      setSpeakingRole('idle');
      setActiveStep(0);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleSimulation = () => {
    const nextState = !isActive;
    setIsActive(nextState);
    if (nextState) {
      setSpeakingRole('user');
      setActiveStep(0);
    }
  };

  const currentItem = simulationSteps[activeStep];

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Feature Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs sm:text-sm font-medium text-sky-300">
            <span className="flex h-2 w-2 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
            <span>Atlas v2.0 &middot; Ultra Low-Latency Voice AI Learning</span>
            <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Master Any Subject with{' '}
            <span className="shimmer-text">Live Voice AI</span> &{' '}
            <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-white bg-clip-text text-transparent">
              Visual Companions
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Atlas pairs natural, full-duplex conversational voice tutoring with real-time synchronized code, math formulas, and automated spaced-repetition flashcards.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="px-8 py-3.5 rounded-full text-base font-semibold text-white glass-button-glow inline-flex items-center gap-2 group"
            >
              <span>Start Learning Free</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={toggleSimulation}
              className="px-7 py-3.5 rounded-full text-base font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 backdrop-blur-xl transition-all duration-200 inline-flex items-center gap-2.5"
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4 text-sky-400" />
                  <span>Pause Demo</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-sky-400 fill-sky-400" />
                  <span>Interactive Voice Preview</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Voice AI Orb & Live Companion Simulator */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/10 via-sky-500/5 to-transparent">
            <div className="rounded-[22px] bg-[#01001a]/80 backdrop-blur-2xl border border-white/[0.06] p-6 sm:p-8 overflow-hidden">

              {/* Header Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="text-xs font-mono text-slate-400 ml-2">Atlas Live Voice Session &middot; AI Mentor: Dr. Turing</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className={`w-2 h-2 rounded-full bg-emerald-400 ${isActive ? 'animate-pulse' : ''}`} />
                  {isActive ? 'Live Duplex Active' : 'Ready to Connect'}
                </div>
              </div>

              {/* Main Stage */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 pb-4">

                {/* Left: Orb */}
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-5">
                  <div className="relative flex items-center justify-center">
                    {isActive && (
                      <div className="absolute w-44 h-44 rounded-full bg-sky-500/15 animate-pulse-slow pointer-events-none" />
                    )}

                    <div
                      onClick={toggleSimulation}
                      className={`relative cursor-pointer w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${
                        isActive
                          ? 'bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-600 shadow-[0_0_40px_rgba(56,189,248,0.5)] scale-105'
                          : 'bg-slate-900/80 border border-white/15 hover:border-sky-400/40 shadow-xl'
                      }`}
                    >
                      {isActive ? (
                        <div className="flex items-end gap-1 h-10">
                          <span className="w-1 bg-white/80 rounded-full animate-[pulse-slow_1.2s_ease-in-out_infinite]" style={{ height: '60%' }} />
                          <span className="w-1 bg-white/80 rounded-full animate-[pulse-slow_1.2s_ease-in-out_0.2s_infinite]" style={{ height: '100%' }} />
                          <span className="w-1 bg-white/80 rounded-full animate-[pulse-slow_1.2s_ease-in-out_0.4s_infinite]" style={{ height: '40%' }} />
                          <span className="w-1 bg-white/80 rounded-full animate-[pulse-slow_1.2s_ease-in-out_0.6s_infinite]" style={{ height: '80%' }} />
                        </div>
                      ) : (
                        <Mic className="w-10 h-10 text-sky-400 transition-transform duration-200" />
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {isActive ? (speakingRole === 'user' ? 'Learner Speaking...' : 'AI Mentor Explaining...') : 'Click Orb to Test Voice'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {isActive ? 'Dual-stream conversational audio' : 'Sub-second real-time speech'}
                    </p>
                  </div>
                </div>

                {/* Right: Companion Stream */}
                <div className="md:col-span-7 flex flex-col justify-center space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-400">
                      <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-semibold uppercase tracking-wider text-slate-300">
                        {isActive ? (speakingRole === 'user' ? 'Learner (Spoken)' : 'AI Mentor (Spoken)') : 'Voice Preview'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 italic">
                      {isActive ? currentItem.text : '"Ask me anything about Machine Learning, Systems Design, Physics, or Languages..."'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-sky-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                        <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
                          Live Visual Companion
                        </span>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 font-mono">
                        {isActive && currentItem.visual ? currentItem.visual.tag : 'Real-Time Sync'}
                      </span>
                    </div>

                    {isActive && currentItem.visual ? (
                      <div className="mt-2 p-3 rounded-xl bg-[#01001a] border border-white/[0.06] font-mono text-xs text-emerald-400 overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{currentItem.visual.content}</pre>
                      </div>
                    ) : (
                      <div className="mt-2 p-3 rounded-xl bg-[#01001a]/60 border border-white/[0.04] font-mono text-xs text-slate-400">
                        <code>// Code snippets, LaTeX formulas, and visual diagrams stream instantly as you talk</code>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Sub-400ms Voice Latency', sub: 'Deepgram + Cartesia Speech' },
            { label: 'Live Visual Companion', sub: 'LaTeX, Code, Diagrams' },
            { label: 'True Cross-Platform', sub: 'Next.js Web + Expo Mobile' },
            { label: 'Long-Term Memory', sub: 'Vector Stored Progress' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-card text-center transition-all duration-200"
            >
              <p className="text-sm font-bold text-white">{item.label}</p>
              <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
