'use client';

import React from 'react';
import { Clock, BookmarkCheck, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { ISession } from '@atlas/types';

interface RecentSessionsListProps {
  sessions: ISession[];
}

export function RecentSessionsList({ sessions }: RecentSessionsListProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs > 0 ? `${secs}s` : ''}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Recent Voice Sessions & Debriefs</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Auto-generated transcripts, identified knowledge gaps, and study summaries.
          </p>
        </div>
      </div>

      {sessions.length > 0 ? (
        <div className="space-y-3">
          {sessions.map((session, idx) => (
            <div
              key={session._id || idx}
              className="p-5 rounded-2xl modern-card space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span className="text-sm font-bold text-slate-950">
                    {session.summary || `Session with Mentor #${session.mentorId}`}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 bg-neutral-100 px-2.5 py-1 rounded-full font-medium text-slate-700">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(session.durationSeconds || 0)}</span>
                  </span>
                  <span>{session.createdAt ? new Date(session.createdAt).toLocaleDateString() : 'Recent'}</span>
                </div>
              </div>

              {session.keyTakeaways && session.keyTakeaways.length > 0 && (
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                    <BookmarkCheck className="w-3.5 h-3.5 text-black" />
                    <span>Key Concepts Mastered:</span>
                  </div>
                  <ul className="space-y-1 pl-5 list-disc text-slate-600">
                    {session.keyTakeaways.map((takeaway, i) => (
                      <li key={i}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-3xl modern-card text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-neutral-100 text-slate-600 mx-auto flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-950">No Sessions Recorded Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Start a voice tutoring call with any AI Mentor above. Your transcripts, summaries, and key concepts will automatically appear here.
          </p>
        </div>
      )}
    </div>
  );
}
