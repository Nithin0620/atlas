'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MentorLauncher from '@/components/dashboard/MentorLauncher';
import RecentSessionsList from '@/components/dashboard/RecentSessionsList';
import FlashcardReviewWidget from '@/components/dashboard/FlashcardReviewWidget';
import { CreateMentorModal } from '@/components/dashboard/CreateMentorModal';
import { Clock, BookOpen, Award, Flame, Sparkles } from 'lucide-react';
import { IMentor, ISession } from '@atlas/types';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState<any>({
    totalCallMinutes: 0,
    conceptsMastered: 0,
    retentionRate: 0,
    learningStreak: 1,
  });
  const [mentors, setMentors] = useState<IMentor[]>([]);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadDashboardData = React.useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      const data = await res.json();

      if (!res.ok || !data.success) {
        router.push('/sign-in');
        return;
      }

      setUserData(data.user);
      if (data.stats) setStats(data.stats);
      if (data.mentors) setMentors(data.mentors);
      if (data.recentSessions) setSessions(data.recentSessions);
      if (data.flashcards) setFlashcards(data.flashcards);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      router.push('/sign-in');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleMentorCreated = (newMentor: IMentor) => {
    setMentors((prev) => [newMentor, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold animate-pulse">
            ✦
          </div>
          <p className="text-xs font-semibold text-slate-500">Loading your Atlas Learning Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-gold-500 selection:text-white pb-24">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-champagne-200/25 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-beige-200/15 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <DashboardHeader
        userName={userData?.name || 'Learner'}
        userEmail={userData?.email || ''}
        learningStreak={stats.learningStreak || 1}
        onOpenCreateMentor={() => setIsCreateModalOpen(true)}
      />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Top Welcome Banner & Analytics Metrics */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="glass-card p-6 rounded-3xl bg-white/60 backdrop-blur-glass border border-white/40 shadow-xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Welcome back, {userData?.name?.split(' ')[0] || 'Learner'}
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Your conversational AI learning dashboard & spaced-repetition progress
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="sm:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full modern-btn-black text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Create AI Mentor</span>
            </button>
          </div>

          {/* 4 Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg hover:shadow-xl transition-all space-y-3">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-medium">Tutoring Time</span>
                <Clock className="w-4 h-4 text-black" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                {stats.totalCallMinutes} <span className="text-xs font-normal text-slate-500">mins</span>
              </p>
              <p className="text-[11px] text-slate-500">Live Voice Sessions</p>
            </div>

            <div className="glass-card p-5 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg hover:shadow-xl transition-all space-y-3">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-medium">Concepts Mastered</span>
                <BookOpen className="w-4 h-4 text-black" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                {stats.conceptsMastered}
              </p>
              <p className="text-[11px] text-slate-500">Key debrief takeaways</p>
            </div>

            <div className="glass-card p-5 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg hover:shadow-xl transition-all space-y-3">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-medium">Flashcard Retention</span>
                <Award className="w-4 h-4 text-black" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                {stats.retentionRate}%
              </p>
              <p className="text-[11px] text-slate-500">Anki SM-2 optimal</p>
            </div>

            <div className="glass-card p-5 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg hover:shadow-xl transition-all space-y-3">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-medium">Active Streak</span>
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                {stats.learningStreak} <span className="text-xs font-normal text-slate-500">{stats.learningStreak === 1 ? 'day' : 'days'}</span>
              </p>
              <p className="text-[11px] text-amber-600 font-semibold">Keep momentum going!</p>
            </div>
          </div>
        </div>

        {/* 1. Mentor Launcher Section */}
        <MentorLauncher
          mentors={mentors}
          onOpenCreateMentor={() => setIsCreateModalOpen(true)}
        />

        {/* 2-Column Grid: Flashcards & Recent Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Flashcards (5 Cols) */}
          <div className="lg:col-span-5">
            <FlashcardReviewWidget
              cards={flashcards}
              onCardUpdated={loadDashboardData}
            />
          </div>

          {/* Recent Sessions (7 Cols) */}
          <div className="lg:col-span-7">
            <RecentSessionsList sessions={sessions} />
          </div>
        </div>

      </main>

      {/* Modal: Create Custom Mentor */}
      <CreateMentorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onMentorCreated={handleMentorCreated}
      />
    </div>
  );
}
