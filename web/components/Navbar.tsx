'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
      className={`fixed top-4 left-0 right-0 z-50 transition-colors duration-500 flex justify-center px-4 md:px-8`}
    >
      <div className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-primary-dark p-[1px] transition-transform duration-300 group-hover:scale-110">
            <span className="text-sm font-black">🪐</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:opacity-80 transition-opacity">
            Atlas
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'AI Mentors', href: '#mentors' },
            { label: 'Visual Companion', href: '#companion' },
            { label: 'Architecture', href: '#architecture' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group py-2"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm btn-premium overflow-hidden"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/70 hover:text-white p-1 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 bg-primary-dark border-b border-white/10 md:hidden overflow-hidden mt-2 rounded-2xl mx-4 glass-nav"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <Link
                href="#mentors"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/80 hover:text-white transition-colors"
              >
                AI Mentors
              </Link>
              <Link
                href="#companion"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/80 hover:text-white transition-colors"
              >
                Visual Companion
              </Link>
              <Link
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/80 hover:text-white transition-colors"
              >
                Architecture
              </Link>
              <div className="h-px bg-white/10 w-full my-2" />
              <Link
                href="/sign-in"
                className="text-base font-medium text-white/80 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-center py-3 text-base btn-premium rounded-full mt-2"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
