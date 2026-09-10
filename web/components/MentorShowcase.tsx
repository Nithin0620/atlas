'use client';

import React, { useState } from 'react';
import { Volume2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function MentorShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');

  const mentors = [
    {
      id: '1',
      name: 'Dr. Elena Rostova',
      role: 'Quantum Physics & Relativity',
      category: 'physics',
      style: 'Socratic Method',
      difficulty: 'Advanced',
      avatar: '⚛️',
      description: 'Challenges your fundamental assumptions through guided inquiry and thought experiments.',
      voiceAccent: 'Warm & Precise',
    },
    {
      id: '2',
      name: 'Marcus Vance',
      role: 'Distributed Systems & Go',
      category: 'engineering',
      style: 'Architectural Coach',
      difficulty: 'Intermediate',
      avatar: '⚡',
      description: 'Focuses on concurrency primitives, Raft consensus, and failure-mode resilience.',
      voiceAccent: 'Clear & Energetic',
    },
    {
      id: '3',
      name: 'Sofia Al-Mansoor',
      role: 'Cognitive Neuroscience',
      category: 'neuro',
      style: 'Storyteller & Visualizer',
      difficulty: 'Beginner to Pro',
      avatar: '🧠',
      description: 'Breaks down synaptic plasticity, neurotransmitters, and memory consolidation through relatable analogies.',
      voiceAccent: 'Calm & Engaging',
    },
    {
      id: '4',
      name: 'Julian Chen',
      role: 'Macroeconomics & Game Theory',
      category: 'economics',
      style: 'Debate & Case Studies',
      difficulty: 'Intermediate',
      avatar: '📈',
      description: 'Simulates market incentives, Nash equilibria, and monetary policy impacts.',
      voiceAccent: 'Dynamic & Sharp',
    },
  ];

  const filteredMentors =
    activeCategory === 'all'
      ? mentors
      : mentors.filter((m) => m.category === activeCategory);

  return (
    <section id="mentors" className="relative py-24 md:py-32 bg-[#01001a]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-600/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-sky-300">
            <span>01 &middot; PERSONALIZED INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Meet Your Specialized AI Mentors
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Switch seamlessly between tailored personas. Each mentor adapts their pedagogy, pacing, and tone to your unique learning style.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Fields' },
            { id: 'physics', label: 'Quantum & Physics' },
            { id: 'engineering', label: 'Software Architecture' },
            { id: 'neuro', label: 'Neuroscience' },
            { id: 'economics', label: 'Game Theory & Econ' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.08]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-2xl glass-card p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-2xl">
                      {mentor.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                      <p className="text-sm font-semibold text-sky-400">{mentor.role}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/[0.06] text-xs font-bold text-slate-300 border border-white/[0.08]">
                    {mentor.difficulty}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-400 leading-relaxed">{mentor.description}</p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] font-medium text-slate-300">
                    Style: <strong className="text-white">{mentor.style}</strong>
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] font-medium text-slate-300">
                    Voice: <strong className="text-white">{mentor.voiceAccent}</strong>
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <button className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors duration-200">
                  <Volume2 className="w-4 h-4" />
                  <span>Sample Voice</span>
                </button>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 group/link transition-colors duration-200"
                >
                  <span>Start Voice Call</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Mentor Studio Banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-sky-950/40 via-[#01001a] to-indigo-950/30 border border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold flex items-center justify-center md:justify-start gap-2 text-white">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>Create Your Custom AI Mentor Studio</span>
            </h4>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Upload custom PDFs, syllabus guidelines, and configure custom system prompts with over 50+ hyper-realistic voice profiles.
            </p>
          </div>
          <Link
            href="/sign-up"
            className="whitespace-nowrap px-6 py-3.5 rounded-xl text-sm font-bold glass-button-white"
          >
            Launch Mentor Studio
          </Link>
        </div>
      </div>
    </section>
  );
}
