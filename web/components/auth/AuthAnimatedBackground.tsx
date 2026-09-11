'use client';

import React from 'react';

export function AuthAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle modern clean background grid */}
      <div className="absolute inset-0 grid-bg-modern opacity-100" />
      
      {/* Subtle modern soft radial lighting */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 20%, rgba(0, 0, 0, 0.02) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
