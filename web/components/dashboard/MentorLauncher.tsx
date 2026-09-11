'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, Sparkles, UserCheck } from 'lucide-react';
import { IMentor } from '@atlas/types';

interface MentorLauncherProps {
  mentors: IMentor[];
  onOpenCreateMentor: () => void;
}

export function MentorLauncher({ mentors, onOpenCreateMentor }: MentorLauncherProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
            <span>Specialized AI Mentors</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-slate-700 font-semibold">
              {mentors.length} Available
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any mentor to launch an instant full-duplex conversational voice tutoring session.
          </p>
        </div>

        <button
          onClick={onOpenCreateMentor}
          className="text-xs font-semibold text-black hover:underline inline-flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>+ New Custom Mentor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mentors.map((mentor) => (
          <div
            key={mentor._id || mentor.name}
            className="p-5 rounded-2xl modern-card flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-2xl shadow-sm">
                  {mentor.avatarUrl || '🧑‍🏫'}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-slate-700 border border-neutral-200">
                  {mentor.difficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-950 mt-3">{mentor.name}</h3>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{mentor.subject}</p>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                {mentor.topic}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500 capitalize">
                {mentor.teachingStyle}
              </span>

              <Link
                href={`/call/${mentor._id || 'default'}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full modern-btn-black text-xs font-semibold"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call Mentor</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
