'use client';

import React, { useState } from 'react';
import { Sparkles, Terminal, BookmarkCheck, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LiveCompanionDemo() {
  const [activeTab, setActiveTab] = useState<'visual' | 'debrief' | 'flashcards'>('visual');

  return (
    <section id="companion" className="relative py-24 md:py-32 bg-transparent text-white overflow-hidden">

      {/* Background Vertical Scan Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: ['-10vw', '110vw'] }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 2 }}
            className="absolute top-0 bottom-0 w-px bg-white/20"
            style={{ left: `${20 * i}%` }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest text-white/50">
            <span>02 &mdash; Companion</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            See What You Hear.
          </h2>
          <p className="text-lg sm:text-xl text-white/60 mt-6 font-light leading-relaxed">
            Atlas listens to the conversation and instantly renders code blocks, diagrams, and math formulas perfectly synchronized with the mentor's voice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Controls */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
            {[
              { id: 'visual', icon: <Terminal className="w-5 h-5" />, label: 'Live Visual Sync' },
              { id: 'debrief', icon: <BookmarkCheck className="w-5 h-5" />, label: 'Session Debrief' },
              { id: 'flashcards', icon: <BrainCircuit className="w-5 h-5" />, label: 'Smart Flashcards' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 text-left border overflow-hidden ${
                  activeTab === tab.id
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                    transition={{ duration: 0.3 }}
                  />
                )}
                {tab.icon}
                <span className="font-semibold text-lg relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8 flex items-center">
            <div className="w-full relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                  className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 sm:p-12 h-full flex flex-col justify-center relative overflow-hidden"
                >

                  {activeTab === 'visual' && (
                    <div className="space-y-12">
                      <div>
                        <div className="flex items-center gap-3 text-white/50 mb-3">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-widest">Spoken Prompt</span>
                        </div>
                        <p className="text-xl sm:text-2xl font-light italic leading-relaxed text-white/90">
                          "Notice how Dijkstra’s algorithm selects the unvisited node with the smallest tentative distance..."
                        </p>
                      </div>

                      <div className="relative">
                        <div className="flex items-center justify-between text-white/50 mb-3 relative z-10">
                          <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                             <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-white rounded-full inline-block" />
                             Live Companion
                          </span>
                          <span className="text-xs font-mono">Time Complexity</span>
                        </div>
                        <div className="bg-[#01001a]/80 p-6 rounded-xl font-mono text-sm text-white/80 border border-white/10 relative overflow-hidden">
                          {/* Scanning Line */}
                          <motion.div
                            animate={{ top: ['0%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white/5 pointer-events-none"
                          />
                          <code>O((V + E) log V) with Min-Heap Priority Queue</code>
                          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-2 h-4 bg-white/50 ml-1 align-middle" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'debrief' && (
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-2xl font-bold">Session Debrief</h4>
                        <p className="text-white/60 mt-2 font-light">AI-generated summary of your 18-minute session.</p>
                      </div>

                      <div className="space-y-4 relative">
                        <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Key Takeaways Covered</div>
                        <ul className="space-y-4 text-base sm:text-lg font-light text-white/80 list-disc pl-5">
                          <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Distinction between optimistic and pessimistic locking in high-throughput databases.</motion.li>
                          <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>Why Two-Phase Locking (2PL) guarantees serializability but introduces deadlock risks.</motion.li>
                          <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>Multi-Version Concurrency Control (MVCC) snapshot isolation tradeoffs.</motion.li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'flashcards' && (
                    <div className="space-y-8 text-center flex flex-col items-center justify-center h-full">
                      <div className="text-xs font-bold uppercase tracking-widest text-white/50">
                        Spaced Repetition &mdash; Due Today
                      </div>
                      <h4 className="text-2xl sm:text-4xl font-bold leading-tight max-w-lg">
                        "What prevents phantom reads in PostgreSQL under Repeatable Read isolation?"
                      </h4>
                      <motion.p animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/40 italic text-sm mt-8">Tap to reveal answer</motion.p>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
