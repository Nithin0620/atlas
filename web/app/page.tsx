'use client';

import { BackgroundGridCanvas } from '@/components/BackgroundGridCanvas';
import { Navbar } from '@/components/Navbar';
import { VoiceHeroDemo } from '@/components/VoiceHeroDemo';
import { MentorShowcase } from '@/components/MentorShowcase';
import { LiveCompanionDemo } from '@/components/LiveCompanionDemo';
import { StatsMetrics } from '@/components/StatsMetrics';
import { CallToAction } from '@/components/CallToAction';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-slate-900 selection:bg-slate-900/90 selection:text-white">
      {/* Dynamic Animated Grid Matrix & Ambient Blooming Auroras */}
      <BackgroundGridCanvas />

      {/* Floating iPhone/visionOS Glassmorphism Navbar */}
      <Navbar />

      {/* Hero Section with Interactive Voice Orb & Live Companion Simulator */}
      <VoiceHeroDemo />

      {/* AI Mentor Showcase & Studio */}
      <MentorShowcase />

      {/* Synchronized Visual Companion Matrix */}
      <LiveCompanionDemo />

      {/* Architecture & Performance Metrics */}
      <StatsMetrics />

      {/* Aurora Call to Action */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </main>
  );
}
