'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current || !lightRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lightRef.current.style.background = `radial-gradient(180px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.18), transparent 80%)`;
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8">
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
        className="relative w-full max-w-5xl rounded-full glass-nav px-5 py-3 transition-colors duration-200 hover:border-white/30"
      >
        {/* Specular White Mouse Tracking Light */}
        <div
          ref={lightRef}
          className={`pointer-events-none absolute -inset-px rounded-full transition-opacity duration-200 ${
            isHoveringNav ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#01001a] p-[1px] shadow-lg shadow-white/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-base font-black">🪐</span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400 shadow-sm shadow-sky-400/60" />
              </span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Atlas
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/[0.04] p-1 border border-white/[0.08]">
            {[
              { label: 'AI Mentors', href: '#mentors' },
              { label: 'Visual Companion', href: '#companion' },
              { label: 'Features', href: '#features' },
              { label: 'Architecture', href: '#architecture' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.1] rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold glass-button-white overflow-hidden"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 pb-2">
            <a
              href="#mentors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-lg"
            >
              AI Mentors
            </a>
            <a
              href="#companion"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-lg"
            >
              Visual Companion
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 rounded-lg"
            >
              Features
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/sign-in"
                className="w-full text-center py-2.5 text-sm font-medium text-slate-200 bg-white/10 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="w-full text-center py-2.5 text-sm font-semibold glass-button-white rounded-lg"
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
