'use client';

import React, { useState } from 'react';
import { Sparkles, Layers, BookmarkCheck, RefreshCw } from 'lucide-react';

export function LiveCompanionDemo() {
  const [activeTab, setActiveTab] = useState<'visual' | 'debrief' | 'flashcards'>('visual');

  return (
    <section id="companion" className="relative py-24 md:py-32 bg-white border-t border-neutral-200/80 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-slate-700 shadow-sm">
            <span>02 &middot; SYNCHRONIZED VISUAL COMPANION</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Beyond Pure Speech
          </h3>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Voice alone is not enough for complex technical concepts. Atlas streams code, equations, and visual diagrams in exact sync with your mentor’s speech.
          </p>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-neutral-100 border border-neutral-200 gap-1 shadow-inner">
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'visual'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>1. Live Companion Stream</span>
            </button>

            <button
              onClick={() => setActiveTab('debrief')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'debrief'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>2. Auto Session Debrief</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>3. Spaced-Repetition Cards</span>
            </button>
          </div>
        </div>

        {/* Tab Content Dynamic View */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-lg">
            {activeTab === 'visual' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-950">Synchronized Visual Stream</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Live streaming formulas and code cards as the mentor speaks.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-medium text-slate-800">
                    Sub-second latency
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="font-semibold text-slate-700">Spoken Prompt</span>
                      <span>0:14s</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                      &quot;Notice how Dijkstra’s algorithm selects the unvisited node with the smallest tentative distance...&quot;
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black text-white space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">Companion Visual Card</span>
                      <span className="font-mono text-slate-400 text-[11px]">Time Complexity</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-900 font-mono text-xs text-emerald-400">
                      <code>O((V + E) log V) with Min-Heap Priority Queue</code>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'debrief' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-950">Instant Session Debrief</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">AI-generated summary and identified knowledge gaps right after you hang up.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-medium text-slate-800">
                    Auto-Generated
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <BookmarkCheck className="w-4 h-4 text-black" />
                    <span>Key Takeaways Covered (18 min session)</span>
                  </div>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Distinction between optimistic and pessimistic locking in high-throughput databases.</li>
                    <li>Why Two-Phase Locking (2PL) guarantees serializability but introduces deadlock risks.</li>
                    <li>Multi-Version Concurrency Control (MVCC) snapshot isolation tradeoffs.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'flashcards' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-950">Spaced-Repetition (SM-2) Flashcards</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Converts difficult discussion topics into daily retention cards.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-medium text-slate-800">
                    Anki Compatible
                  </span>
                </div>

                <div className="p-8 rounded-2xl bg-black text-white text-center space-y-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Card 1 of 6 • Due Today</p>
                  <p className="text-base sm:text-lg font-bold text-white max-w-lg mx-auto leading-relaxed">
                    &quot;What prevents phantom reads in PostgreSQL under Repeatable Read isolation?&quot;
                  </p>
                  <p className="text-xs text-neutral-400 italic">Tap to reveal answer & rate retention difficulty (Easy / Good / Hard)</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
