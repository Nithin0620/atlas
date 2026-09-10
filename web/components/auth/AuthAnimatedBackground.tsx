'use client';

import React, { useEffect, useRef } from 'react';

export function AuthAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let lastTime = 0;
    const interval = 1000 / 30;

    const render = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#01001a]">
      <div className="absolute inset-0 grid-bg-animated opacity-50" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute -top-16 left-12 w-64 h-64 bg-white/[0.04] rounded-full blur-[100px] animate-float" />
      <div className="absolute top-10 right-20 w-44 h-44 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md animate-float-delayed rotate-12" />
      <div className="absolute top-28 left-1/4 w-28 h-28 rounded-full border border-white/10 bg-[#1c0d48]/30 backdrop-blur-lg animate-float -rotate-45" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1c0d48]/30 rounded-full blur-[120px]" />

      <div className="absolute -bottom-20 right-16 w-80 h-80 bg-white/[0.03] rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-16 left-20 w-48 h-48 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md animate-float -rotate-12" />
      <div className="absolute bottom-24 right-1/4 w-32 h-32 rounded-2xl border border-white/10 bg-[#130833]/30 backdrop-blur-lg animate-float-delayed rotate-45" />
    </div>
  );
}
