'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#01001a] backdrop-blur-xl py-12 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white text-[#01001a] flex items-center justify-center text-sm shadow-md font-bold">
            🪐
          </div>
          <span className="font-bold text-white text-base">Atlas</span>
          <span className="text-xs text-slate-500">© 2026 Atlas AI Inc. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <a href="#mentors" className="hover:text-white transition-colors">Mentors</a>
          <a href="#companion" className="hover:text-white transition-colors">Visual Companion</a>
          <a href="#features" className="hover:text-white transition-colors">Architecture</a>
          <Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link>
          <Link href="/sign-up" className="hover:text-white transition-colors">Register</Link>
        </div>
      </div>
    </footer>
  );
}
