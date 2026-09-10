'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-[#01001a]">
      {/* Radiant Diffusion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-xs font-semibold text-white">
          <span>Transform Your Daily Learning</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Ready to Experience the Future of <br className="hidden sm:inline" />
          <span className="shimmer-text-white">AI Voice Mentorship?</span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Start your first conversational tutoring session in under 30 seconds. No credit card required.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/sign-up"
            className="px-9 py-4 rounded-full text-base font-semibold glass-button-white flex items-center gap-2 group"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/sign-in"
            className="px-8 py-4 rounded-full text-base font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 backdrop-blur-xl transition-all"
          >
            Sign In with Existing Account
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Web + iOS & Android Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Zero Setup Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Free Tier Available</span>
          </div>
        </div>

      </div>
    </section>
  );
}
