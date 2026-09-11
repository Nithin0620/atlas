'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Flame, Plus, Sparkles, User as UserIcon } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  userEmail: string;
  learningStreak: number;
  onOpenCreateMentor: () => void;
}

export function DashboardHeader({
  userName,
  userEmail,
  learningStreak,
  onOpenCreateMentor,
}: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/sign-in');
    } catch (e) {
      router.push('/sign-in');
    }
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
              ✦
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-950">
              Atlas
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-slate-700 font-semibold border border-neutral-200">
              STUDIO
            </span>
          </Link>
        </div>

        {/* Right: Actions, Streak, User Profile, Logout */}
        <div className="flex items-center gap-3">
          {/* Create Mentor Button */}
          <button
            onClick={onOpenCreateMentor}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create AI Mentor</span>
          </button>

          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-bold text-slate-800 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{learningStreak} Day Streak</span>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/50 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="text-xs font-semibold text-slate-800 hidden md:inline max-w-[120px] truncate">
              {userName || userEmail}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-full hover:bg-neutral-100 text-slate-500 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
