'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PhoneCall, Sparkles, Mic, Gauge, Layers, Search } from 'lucide-react';
import { IMentor } from '@atlas/types';

interface MentorLauncherProps {
  mentors: IMentor[];
  onOpenCreateMentor: () => void;
}

export function MentorLauncher({ mentors, onOpenCreateMentor }: MentorLauncherProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const subjects = useMemo(() => {
    const set = new Set<string>();
    mentors.forEach((m) => {
      if (m.subject) set.add(m.subject);
    });
    return ['all', ...Array.from(set)];
  }, [mentors]);

  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const matchSubject = selectedSubject === 'all' || m.subject === selectedSubject;
      const matchQuery =
        !searchQuery ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.topic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchQuery;
    });
  }, [mentors, selectedSubject, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Header + Search/Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
            <span>Specialized AI Mentors</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-slate-700 font-semibold border border-neutral-200">
              {filteredMentors.length} Available
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            1-click instant full-duplex conversational voice tutoring with customized pace & depth.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentor or topic..."
              className="pl-8 pr-3 py-1.5 rounded-full border border-neutral-200 text-xs bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black w-48 sm:w-56"
            />
          </div>

          <button
            onClick={onOpenCreateMentor}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-full modern-btn-black inline-flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ New Mentor</span>
          </button>
        </div>
      </div>

      {/* Subject Filter Pills */}
      {subjects.length > 2 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-full capitalize font-medium transition-all whitespace-nowrap ${
                selectedSubject === sub
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-slate-600 hover:bg-neutral-200 border border-neutral-200/60'
              }`}
            >
              {sub === 'all' ? 'All Subjects' : sub}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Mentors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor._id || mentor.name}
            className="glass-card p-5 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-2xl shadow-sm">
                  {mentor.avatarUrl || '🧑‍🏫'}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-slate-700 border border-neutral-200">
                    {mentor.difficulty || 'beginner'}
                  </span>
                  {mentor.depth && (
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100">
                      {mentor.depth === 'deep_dive' ? 'Deep Dive' : mentor.depth === 'overview' ? 'Overview' : 'Exam Drill'}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-950 mt-3">{mentor.name}</h3>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{mentor.subject}</p>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                {mentor.topic}
              </p>

              {/* Tags for Voice & Pace */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-slate-600 border border-neutral-200/70">
                  <Mic className="w-2.5 h-2.5 text-slate-500" />
                  <span>{mentor.voiceName ? mentor.voiceName.split(' ')[0] : (mentor.voiceId || 'Neural')}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-slate-600 border border-neutral-200/70">
                  <Gauge className="w-2.5 h-2.5 text-slate-500" />
                  <span className="capitalize">{mentor.pace || 'natural'} pace</span>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500 capitalize">
                {mentor.teachingStyle || 'socratic'}
              </span>

              <Link
                href={`/call/${mentor._id || 'default'}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full modern-btn-black text-xs font-semibold hover:scale-105 transition-transform"
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

export default React.memo(MentorLauncher);
