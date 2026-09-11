'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative border-t border-white/50 glass-section py-10 text-slate-500 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shadow-sm">
            ✦
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight">Atlas</span>
          <span className="text-slate-400">© 2026 Atlas AI Inc. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium">
          <Link href="/features" className="hover:text-black transition-colors">Features</Link>
          <Link href="/how-it-works" className="hover:text-black transition-colors">How it Works</Link>
          <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
          <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
