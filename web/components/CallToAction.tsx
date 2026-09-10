'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CallToAction() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-transparent border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 w-full"
        >
          <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
            <span>Get Started</span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-[1.05]">
            Experience the Future of <br className="hidden sm:inline" />
            <span className="italic font-light">Learning.</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link
              href="/sign-up"
              className="px-10 py-5 rounded-full text-lg btn-premium flex items-center gap-3 group w-full sm:w-auto justify-center"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/sign-in"
              className="px-10 py-5 rounded-full text-lg btn-premium-dark w-full sm:w-auto justify-center text-center"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
