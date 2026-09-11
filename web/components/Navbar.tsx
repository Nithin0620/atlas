'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 md:px-8">
      <div className="relative w-full max-w-5xl rounded-full bg-white/85 backdrop-blur-xl border border-neutral-200/90 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] px-5 py-2.5">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
              ✦
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">
              Atlas
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Features', href: '/features' },
              { label: 'How it Works', href: '/how-it-works' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Contact', href: '/contact' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-black hover:bg-neutral-100 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3 text-sm">
            <Link
              href="/sign-in"
              className="font-medium text-slate-600 hover:text-black px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full modern-btn-black text-xs font-semibold"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-700 hover:text-black p-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-neutral-100 flex flex-col gap-2 text-sm">
            <Link
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-neutral-100 rounded-xl font-medium"
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-neutral-100 rounded-xl font-medium"
            >
              How it Works
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-neutral-100 rounded-xl font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-neutral-100 rounded-xl font-medium"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-neutral-100 rounded-xl font-medium"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-neutral-100 rounded-xl font-medium"
            >
              Terms
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/sign-in"
                className="w-full text-center py-2.5 rounded-full border border-neutral-200 text-slate-900 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="w-full text-center py-2.5 rounded-full modern-btn-black font-semibold text-xs"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
