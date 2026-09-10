'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-transparent py-12 text-white/50 text-sm border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-primary-dark flex items-center justify-center text-sm font-black">
              🪐
            </div>
            <span className="font-bold text-white text-base tracking-tight">Atlas</span>
          </div>
          <span className="hidden md:block w-px h-4 bg-white/20" />
          <span className="text-xs font-mono uppercase tracking-widest">© {new Date().getFullYear()} Atlas AI Inc.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
          <Link href="#mentors" className="hover:text-white transition-colors">Mentors</Link>
          <Link href="#companion" className="hover:text-white transition-colors">Companion</Link>
          <Link href="#architecture" className="hover:text-white transition-colors">Architecture</Link>
          <Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link>
        </div>
      </div>
    </footer>
  );
}
