'use client';

import React, { useState, useMemo } from 'react';
import { Clock, BookmarkCheck, ChevronDown, ChevronUp, MessageSquare, Sparkles } from 'lucide-react';
import { ISession } from '@atlas/types';

interface RecentSessionsListProps {
  sessions: ISession[];
}

export function RecentSessionsList({ sessions }: RecentSessionsListProps) {
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const formatDuration = useMemo(() => (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs > 0 ? `${secs}s` : ''}`;
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedSessionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
            <span>Recent Voice Sessions & Debriefs</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-slate-700 font-semibold border border-neutral-200">
              {sessions.length} Recorded
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Auto-generated transcripts, identified knowledge gaps, and study summaries.
          </p>
        </div>
      </div>

      {sessions.length > 0 ? (
        <div className="space-y-3">
          {sessions.map((session, idx) => {
            const sid = session._id || String(idx);
            const isExpanded = expandedSessionId === sid;
            const mentorObj = typeof session.mentorId === 'object' ? (session.mentorId as any) : null;

            return (
              <div
                key={sid}
                className="glass-card p-5 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg hover:shadow-xl transition-all space-y-3"
              >
                {/* Session Top Bar */}
                <div
                  onClick={() => toggleExpand(sid)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer border-b border-neutral-100 pb-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-sm shadow-sm">
                      {mentorObj?.avatarUrl || '🧑‍🏫'}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-950 block">
                        {mentorObj?.name ? `Tutoring Session with ${mentorObj.name}` : `Voice Session #${idx + 1}`}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {mentorObj?.subject ? `${mentorObj.subject} · ${mentorObj.topic}` : 'General Learning'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 bg-neutral-100 px-2.5 py-1 rounded-full font-medium text-slate-700">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(session.durationSeconds || 0)}</span>
                    </span>
                    <span>{session.createdAt ? new Date(session.createdAt).toLocaleDateString() : 'Recent'}</span>
                    <button className="p-1 rounded-full hover:bg-neutral-100 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Key Concepts Mastered */}
                {session.keyTakeaways && session.keyTakeaways.length > 0 && (
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <BookmarkCheck className="w-3.5 h-3.5 text-black" />
                      <span>Key Takeaways & Concept Debrief:</span>
                    </div>
                    <ul className="space-y-1 pl-5 list-disc text-slate-600">
                      {session.keyTakeaways.map((takeaway, i) => (
                        <li key={i}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expandable Full Transcript Preview */}
                {isExpanded && (
                  <div className="pt-2 border-t border-neutral-100 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                      <span>Session Transcript & Summary</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                      {session.summary || 'No transcript text recorded for this session.'}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card p-8 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg text-center space-y-3">
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

export default React.memo(RecentSessionsList);
