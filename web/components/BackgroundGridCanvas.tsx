'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function BackgroundGridCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-primary-dark gpu-layer">
      <motion.div
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-white opacity-[0.015] blur-[100px] rounded-full"
      />
      <motion.div
        animate={{
          x: ['5%', '-5%', '5%'],
          y: ['5%', '-5%', '5%'],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-white opacity-[0.01] blur-[120px] rounded-full"
      />
    </div>
  );
}
