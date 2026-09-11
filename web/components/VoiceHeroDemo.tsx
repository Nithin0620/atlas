'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Sparkles, ArrowRight, Play, Pause, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function VoiceHeroDemo() {
  const [isActive, setIsActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [speakingRole, setSpeakingRole] = useState<'idle' | 'user' | 'assistant'>('idle');

  const simulationSteps = React.useMemo(() => ([
    {
      role: 'user',
      text: '"Hey Atlas, how does backpropagation calculate gradients in a deep neural network?"',
      visual: null,
    },
    {
      role: 'assistant',
      text: '"It computes the gradient of the loss with respect to each weight using the chain rule..."',
      visual: {
        type: 'formula',
        title: 'Chain Rule Gradient',
        content: '∂L/∂w = (∂L/∂ŷ) · (∂ŷ/∂z) · (∂z/∂w)',
        tag: 'LaTeX Formula',
      },
    },
    {
      role: 'assistant',
      text: '"Then we update each parameter by taking a step opposite the gradient:"',
      visual: {
        type: 'code',
        title: 'Weight Update Step',
        content: 'w = w - learning_rate * dW\nb = b - learning_rate * db',
        tag: 'Python / PyTorch',
      },
    },
  ]), []);

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
    }
    return () => clearInterval(interval);
  }, [isActive, simulationSteps]);

  const toggleSimulation = () => {
    const nextState = !isActive;
    setIsActive(nextState);
    if (nextState) {
      setSpeakingRole('user');
      setActiveStep(0);
    } else {
      setSpeakingRole('idle');
      setActiveStep(0);
    }
  };

  const currentItem = simulationSteps[activeStep];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>Atlas v2.0 &middot; Ultra Low-Latency Voice AI Learning</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
            Master Any Subject with{' '}
            <span className="bg-gradient-to-r from-black via-slate-800 to-slate-600 bg-clip-text text-transparent">
              Live Voice AI
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Atlas pairs natural, full-duplex conversational voice tutoring with real-time synchronized code, math formulas, and automated spaced-repetition flashcards.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="px-7 py-3 rounded-full modern-btn-black inline-flex items-center gap-2 text-sm"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={toggleSimulation}
              className="px-6 py-3 rounded-full modern-btn-outline inline-flex items-center gap-2 text-sm"
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Demo</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  <span>Interactive Voice Demo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modern Voice AI Simulator Card */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xl shadow-slate-100">
            <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6 sm:p-8">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-neutral-300" />
                  <div className="w-3 h-3 rounded-full bg-neutral-300" />
                  <div className="w-3 h-3 rounded-full bg-neutral-300" />
                  <span className="text-xs font-mono font-medium text-slate-500 ml-2">
                    Live Session &middot; AI Mentor: Dr. Turing
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white border border-neutral-200 text-slate-800 shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span>{isActive ? 'Live Duplex Active' : 'Ready to Connect'}</span>
                </div>
              </div>

              {/* Main Stage */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 pb-3">
                
                {/* Left: Orb & Soundwave */}
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    {isActive && (
                      <div className="absolute w-40 h-40 rounded-full bg-black/5 animate-ping" />
                    )}

                    <div
                      onClick={toggleSimulation}
                      className={`relative cursor-pointer w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-black text-white shadow-xl scale-105'
                          : 'bg-white border-2 border-neutral-200 text-slate-900 hover:border-black shadow-md'
                      }`}
                    >
                      {isActive ? (
                        <div className="flex items-end gap-1 h-8">
                          <span className="w-1 bg-white rounded-full animate-pulse" style={{ height: '60%' }} />
                          <span className="w-1 bg-white rounded-full animate-pulse" style={{ height: '100%', animationDelay: '0.1s' }} />
                          <span className="w-1 bg-white rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0.2s' }} />
                          <span className="w-1 bg-white rounded-full animate-pulse" style={{ height: '85%', animationDelay: '0.3s' }} />
                        </div>
                      ) : (
                        <Mic className="w-9 h-9" />
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {isActive
                        ? speakingRole === 'user'
                          ? 'Learner Speaking...'
                          : 'AI Mentor Explaining...'
                        : 'Click Orb to Test Voice'}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isActive ? 'Dual-stream conversational audio' : 'Sub-second real-time speech'}
                    </p>
                  </div>
                </div>

                {/* Right: Transcript & Live Visual Companion */}
                <div className="md:col-span-7 flex flex-col justify-center space-y-3.5">
                  <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5 text-xs text-slate-500 font-medium">
                      <Volume2 className="w-3.5 h-3.5 text-black" />
                      <span className="font-semibold uppercase tracking-wider text-slate-700">
                        {isActive ? (speakingRole === 'user' ? 'Learner (Spoken)' : 'AI Mentor (Spoken)') : 'Voice Preview'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 italic leading-relaxed">
                      {isActive ? currentItem.text : '"Ask me anything about Machine Learning, Systems Design, Physics, or Mathematics..."'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black text-white shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                          Live Visual Companion
                        </span>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white font-mono">
                        {isActive && currentItem.visual ? currentItem.visual.tag : 'Real-Time Sync'}
                      </span>
                    </div>

                    {isActive && currentItem.visual ? (
                      <div className="mt-2 p-3 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{currentItem.visual.content}</pre>
                      </div>
                    ) : (
                      <div className="mt-2 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 font-mono text-xs text-slate-400">
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
              className="p-5 rounded-2xl modern-card text-center"
            >
              <p className="text-sm font-bold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
