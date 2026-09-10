'use client';

import React, { useEffect, useRef } from 'react';

interface Pulse {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  maxAlpha: number;
  life: number;
}

export function BackgroundGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
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

    const gridSize = 48;
    const pulses: Pulse[] = [];
    const colors = ['#ffffff', '#f8fafc'];

    const spawnPulse = () => {
      if (pulses.length > 20) return;
      const snapX = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const snapY = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';

      pulses.push({
        x: snapX,
        y: snapY,
        vx: direction === 'horizontal' ? (Math.random() > 0.5 ? 2 : -2) : 0,
        vy: direction === 'vertical' ? (Math.random() > 0.5 ? 2 : -2) : 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2.5,
        alpha: 0,
        maxAlpha: 0.8,
        life: 0,
      });
    };

    let timer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      timer++;
      if (timer % 20 === 0) {
        spawnPulse();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life < 20) {
          p.alpha = (p.life / 20) * p.maxAlpha;
        } else if (p.life > 90) {
          p.alpha -= 0.02;
        }

        if (p.alpha <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          pulses.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x - p.vx * 6, p.y - p.vy * 6);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#01001a] gpu-layer">
      {/* Background Ambient Lighting */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 40%, rgba(40, 19, 99, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 20% 75%, rgba(255, 255, 255, 0.06) 0%, transparent 55%)
          `
        }}
      />

      {/* Crisp Pure White Background Grid */}
      <div className="absolute inset-0 grid-bg-animated opacity-100" />

      {/* Moving White Pulses Along Grid Lines */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
}
