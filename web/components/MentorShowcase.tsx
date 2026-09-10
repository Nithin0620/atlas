'use client';

import React, { useState } from 'react';
import { Bot, Code2, Globe, BrainCircuit, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MentorShowcase() {
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      name: 'Alan Turing',
      role: 'Computer Science & Mathematics',
      style: 'Socratic, analytical, and rigorous.',
      icon: <BrainCircuit className="w-6 h-6 text-primary-dark" />,
      greeting: "Let's break down this algorithm. What is the fundamental time complexity here, and how can we optimize the bottleneck?",
    },
    {
      name: 'Marie Curie',
      role: 'Physics & Chemistry',
      style: 'Direct, empirical, and encouraging.',
      icon: <Activity className="w-6 h-6 text-primary-dark" />,
      greeting: "Observe the reaction carefully. Can you derive the half-life equation based on the decay constant we just calculated?",
    },
    {
      name: 'Grace Hopper',
      role: 'Systems & Architecture',
      style: 'Practical, structured, and clear.',
      icon: <Code2 className="w-6 h-6 text-primary-dark" />,
      greeting: "When designing this microservice, have you considered how the database locks will behave under high concurrent throughput?",
    },
    {
      name: 'Polyglot',
      role: 'Language Acquisition',
      style: 'Immersive, patient, and conversational.',
      icon: <Globe className="w-6 h-6 text-primary-dark" />,
      greeting: "¡Hola! Let's practice conjugating the subjunctive today. Don't worry about mistakes, just try to keep the flow of conversation.",
    },
  ];

  return (
    <section id="mentors" className="relative py-24 md:py-32 bg-white text-primary-dark overflow-hidden">

      {/* Animated Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
         <motion.div animate={{ rotate: [0, 90, 0] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="w-[80vw] h-[80vw] border-[0.5px] border-primary-dark/[0.03] absolute top-[-20%] right-[-20%] transform rotate-45" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest text-primary-dark/50">
            <span>01 &mdash; Personas</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Curated Intelligence. <br/>
            Infinite Patience.
          </h2>
          <p className="text-lg sm:text-xl text-primary-dark/60 mt-6 font-light leading-relaxed">
            Select a mentor perfectly tailored to your learning style. From rigorous Socratic questioning to patient, conversational immersion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

          {/* Persona List */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {personas.map((persona, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
                onClick={() => setActivePersona(idx)}
                className={`group relative flex items-start gap-5 p-6 rounded-2xl transition-all duration-300 text-left w-full overflow-hidden ${
                  activePersona === idx
                    ? 'bg-primary-dark/[0.03] scale-100 opacity-100'
                    : 'bg-transparent scale-95 opacity-50 hover:opacity-100 hover:bg-primary-dark/[0.01]'
                }`}
              >
                {activePersona === idx && (
                   <motion.div
                     layoutId="activePersonaBg"
                     className="absolute inset-0 bg-primary-dark/[0.03] rounded-2xl"
                     initial={false}
                     transition={{ duration: 0.4, ease: "easeInOut" }}
                   />
                )}
                <div className="mt-1 relative z-10">
                  <motion.div animate={activePersona === idx ? { y: [-3, 3, -3] } : {}} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                    {persona.icon}
                  </motion.div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-primary-dark">{persona.name}</h3>
                  <p className="text-sm font-medium text-primary-dark/60 mt-1">{persona.role}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Persona Details / Demo */}
          <div className="lg:col-span-7 flex items-center">
            <div className="w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePersona}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                  className="bg-primary-dark/[0.02] p-8 sm:p-12 rounded-[2rem] border border-primary-dark/5 relative overflow-hidden"
                >
                  {/* Subtle pulsing background within card */}
                  <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-0 right-0 w-32 h-32 bg-primary-dark/5 rounded-bl-full" />

                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center text-white">
                      <Bot className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold">{personas[activePersona].name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-primary-dark animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-widest text-primary-dark/60">Voice Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 relative z-10">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary-dark/40 mb-2">Teaching Style</p>
                      <p className="text-lg font-medium">{personas[activePersona].style}</p>
                    </div>

                    <div className="pl-6 border-l-2 border-primary-dark/10 relative overflow-hidden">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary-dark/40 mb-2">Example Audio Response</p>
                      <p className="text-xl sm:text-2xl font-light italic leading-relaxed text-primary-dark/80">
                        "{personas[activePersona].greeting}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
