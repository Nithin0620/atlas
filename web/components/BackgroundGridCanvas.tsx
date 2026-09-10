'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function BackgroundGridCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-primary-dark gpu-layer">

      {/* Abstract Blur Orbs */}
      <motion.div
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-white opacity-[0.015] blur-[100px] rounded-full"
      />
      <motion.div
        animate={{
          x: ['5%', '-5%', '5%'],
          y: ['5%', '-5%', '5%'],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 40, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-white opacity-[0.01] blur-[120px] rounded-full"
      />

      {/* Cinematic Orbital Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        <motion.circle
          cx="50%" cy="50%" r="40vw"
          fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 12"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50%', originY: '50%' }}
        />
        <motion.circle
          cx="50%" cy="50%" r="55vw"
          fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 24"
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '50%', originY: '50%' }}
        />
      </svg>
    </div>
  );
}
