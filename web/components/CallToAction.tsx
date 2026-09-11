'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function CallToAction() {
  return (
    <section className="relative py-24 md:py-32 glass-section border-t border-white/50 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <Reveal className="space-y-6">
        <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/60 text-xs font-semibold text-slate-700 shadow-sm overflow-hidden animate-shimmer">
          <span>Transform Your Daily Learning</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-sky-600 bg-clip-text text-transparent animate-gradient-text">
            Ready to Experience the Future of AI Voice Mentorship?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
          Start your first conversational tutoring session in under 30 seconds. No credit card required.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/sign-up"
            className="px-8 py-3.5 rounded-full modern-btn-black text-sm font-semibold inline-flex items-center gap-2 shadow-md"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/sign-in"
            className="px-7 py-3.5 rounded-full modern-btn-outline text-sm font-semibold"
          >
            Sign In with Existing Account
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-black" />
            <span>Web + iOS & Android Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-black" />
            <span>Zero Setup Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-black" />
            <span>Free Tier Available</span>
          </div>
        </div>
        </Reveal>

      </div>
    </section>
  );
}
