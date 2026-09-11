'use client';

import React, { useState } from 'react';
import { Volume2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

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
      avatar: '⚛',
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
      description: 'Breaks down synaptic plasticity, neurotransmitters, and memory consolidation through clear analogies.',
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
    <section id="mentors" className="relative py-24 md:py-32 glass-section border-t border-white/50 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto space-y-3">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/60 glass px-3.5 py-1.5 text-xs font-semibold tracking-wider text-slate-700 shadow-sm overflow-hidden animate-shimmer">
            <span>01 &middot; PERSONALIZED INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-sky-600 bg-clip-text text-transparent animate-gradient-text">
              Meet Your Specialized AI Mentors
            </span>
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Switch seamlessly between tailored personas. Each mentor adapts their pedagogy, pacing, and tone to your unique learning style.
          </p>
        </Reveal>

        {/* Category Filter Pills */}
        <Reveal delay={120} className="mt-10 flex flex-wrap items-center justify-center gap-2">
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
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white/50 backdrop-blur text-slate-600 hover:text-black border border-white/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        {/* Mentors Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor, idx) => (
            <Reveal key={mentor.id} delay={idx * 90} className="h-full">
              <div
                className="rounded-2xl modern-card glow-border p-6 sm:p-7 flex flex-col justify-between h-full"
              >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-2xl">
                      {mentor.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">{mentor.name}</h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">{mentor.role}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-slate-700">
                    {mentor.difficulty}
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">{mentor.description}</p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-lg bg-neutral-100 text-slate-700 font-medium">
                    Style: <strong className="text-slate-900 font-semibold">{mentor.style}</strong>
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-neutral-100 text-slate-700 font-medium">
                    Voice: <strong className="text-slate-900 font-semibold">{mentor.voiceAccent}</strong>
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold">
                <button className="inline-flex items-center gap-2 text-slate-500 hover:text-black transition-colors">
                  <Volume2 className="w-4 h-4" />
                  <span>Sample Voice</span>
                </button>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-1.5 text-black hover:text-neutral-700 group transition-colors"
                >
                  <span>Start Voice Call</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Custom Mentor Studio Banner */}
        <Reveal delay={150}>
          <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-black text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div aria-hidden className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-indigo-500/30 blur-3xl animate-blob" />
            <div className="space-y-2 text-center md:text-left relative z-10">
              <h4 className="text-xl sm:text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-5 h-5 text-white" />
                <span>Create Your Custom AI Mentor Studio</span>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
                Upload custom PDFs, syllabus guidelines, and configure custom system prompts with hyper-realistic voice profiles.
              </p>
            </div>
            <Link
              href="/sign-up"
              className="whitespace-nowrap px-6 py-3 rounded-full glass text-black text-sm font-semibold hover:bg-white/70 transition-all shadow-md"
            >
              Launch Mentor Studio
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
