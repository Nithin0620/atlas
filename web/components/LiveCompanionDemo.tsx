'use client';

import React, { useState } from 'react';
import { Sparkles, Layers, BookmarkCheck, RefreshCw } from 'lucide-react';

export function LiveCompanionDemo() {
  const [activeTab, setActiveTab] = useState<'visual' | 'debrief' | 'flashcards'>('visual');

  return (
    <section id="companion" className="relative py-24 md:py-32 bg-[#01001a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Beyond Pure Speech
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Live <span className="shimmer-text-white">Visual Companion</span> Matrix
          </h3>
          <p className="text-base sm:text-lg text-slate-300">
            Voice alone is not enough for complex technical concepts. Atlas streams code, equations, and visual diagrams in exact sync with your mentor’s speech.
          </p>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl gap-1">
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'visual'
                  ? 'bg-white text-[#01001a] font-bold shadow-lg shadow-white/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>1. Live Companion Stream</span>
            </button>

            <button
              onClick={() => setActiveTab('debrief')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'debrief'
                  ? 'bg-white text-[#01001a] font-bold shadow-lg shadow-white/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>2. Auto Post-Session Debrief</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-white text-[#01001a] font-bold shadow-lg shadow-white/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>3. Spaced-Repetition Cards</span>
            </button>
          </div>
        </div>

        {/* Tab Content Dynamic View */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl">
            <div className="rounded-[22px] bg-[#01001a]/90 backdrop-blur-2xl border border-white/[0.06] p-6 sm:p-10">
              
              {activeTab === 'visual' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">Synchronized Visual Stream</h4>
                      <p className="text-sm text-slate-400 mt-1">Live streaming formulas and code cards as the mentor speaks.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-xs font-mono text-white">
                      Sub-second latency
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#01001a] border border-white/[0.06] space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-slate-200">Spoken Prompt</span>
                        <span>0:14s</span>
                      </div>
                      <p className="text-sm text-slate-300 italic">
                        &quot;Notice how Dijkstra’s algorithm selects the unvisited node with the smallest tentative distance...&quot;
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">Companion Visual Card</span>
                        <span className="font-mono text-slate-300 text-[11px]">Time Complexity</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#01001a] font-mono text-xs text-white">
                        <code>O((V + E) log V) with Min-Heap Priority Queue</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'debrief' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">Instant Session Debrief</h4>
                      <p className="text-sm text-slate-400 mt-1">AI-generated summary and identified knowledge gaps right after you hang up.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white">
                      Auto-Generated
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#01001a] border border-white/10 space-y-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <BookmarkCheck className="w-4 h-4 text-white" />
                      <span>Key Takeaways Covered (18 min session)</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc pl-5">
                      <li>Distinction between optimistic and pessimistic locking in high-throughput databases.</li>
                      <li>Why Two-Phase Locking (2PL) guarantees serializability but introduces deadlock risks.</li>
                      <li>Multi-Version Concurrency Control (MVCC) snapshot isolation tradeoffs.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'flashcards' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">Spaced-Repetition (SM-2) Flashcards</h4>
                      <p className="text-sm text-slate-400 mt-1">Converts difficult discussion topics into daily retention cards.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white">
                      Anki Algorithm
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#1c0d48] border border-white/20 text-center space-y-4">
                    <p className="text-xs uppercase tracking-widest text-slate-300 font-semibold">Card 1 of 6 • Due Today</p>
                    <p className="text-base sm:text-lg font-bold text-white">
                      &quot;What prevents phantom reads in PostgreSQL under Repeatable Read isolation?&quot;
                    </p>
                    <p className="text-xs text-slate-400 italic">Tap to reveal answer & rate retention difficulty (Easy / Good / Hard)</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
