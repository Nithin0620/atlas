'use client';

import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, Mic, Gauge, BookOpen, Layers, Check, Crown } from 'lucide-react';
import { CURATED_VOICES, HISTORICAL_PERSONAS, IPersonaPreset } from '@/lib/vapi';
import { MentorDifficulty, MentorTeachingStyle, MentorPace, MentorDepth } from '@atlas/types';

interface CreateMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMentorCreated: (mentor: any) => void;
}

const AVATAR_OPTIONS = ['⚛️', '🕊️', '⚡', '🧠', '🏛️', '💻', '🌌', '✨', '🔬', '🧑‍🏫', '🎓', '🎨'];

export function CreateMentorModal({
  isOpen,
  onClose,
  onMentorCreated,
}: CreateMentorModalProps) {
  const [activeTab, setActiveTab] = useState<'basics' | 'voice' | 'pedagogy'>('basics');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('🧑‍🏫');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState('alloy');
  const [pace, setPace] = useState<MentorPace>('natural');
  const [difficulty, setDifficulty] = useState<MentorDifficulty>('intermediate');
  const [depth, setDepth] = useState<MentorDepth>('deep_dive');
  const [teachingStyle, setTeachingStyle] = useState<MentorTeachingStyle>('socratic');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const selectedVoice = CURATED_VOICES.find((v) => v.voiceId === selectedVoiceId) || CURATED_VOICES[0];

  const handleSelectPersona = (persona: IPersonaPreset) => {
    setName(persona.name);
    setAvatarUrl(persona.avatarUrl);
    setSubject(persona.subject);
    setTopic(persona.topic);
    setSelectedVoiceId(persona.voiceId);
    setPace(persona.pace);
    setDifficulty(persona.difficulty);
    setDepth(persona.depth);
    setTeachingStyle(persona.teachingStyle);
    setSystemPrompt(persona.roleplayPrompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject || !topic) {
      setActiveTab('basics');
      setErrorMsg('Please fill in Mentor Name, Subject, and Topic.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          subject,
          topic,
          difficulty,
          teachingStyle,
          pace,
          depth,
          voiceProvider: selectedVoice.provider,
          voiceId: selectedVoice.voiceId,
          voiceName: selectedVoice.name,
          avatarUrl,
          systemPrompt,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || 'Failed to save mentor to database');
        setIsSubmitting(false);
        return;
      }

      onMentorCreated(json.data);
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save mentor to database');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-neutral-200 text-slate-900 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-lg font-bold shadow-md">
              <Sparkles className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-950">AI Mentor Studio</h3>
              <p className="text-xs text-slate-500">Configure customized voice, speaking pace, difficulty, and depth.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-slate-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-100 border border-neutral-200/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('basics')}
            className={`flex-1 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'basics' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-black'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Identity & Scope</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`flex-1 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'voice' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-black'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>2. Voice & Pacing</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pedagogy')}
            className={`flex-1 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'pedagogy' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-black'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Depth & Style</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* TAB 1: IDENTITY & SCOPE */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              {/* Historical & Famous Persona Presets */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quick-Select Historical Persona</span>
                  </span>
                  <span className="text-[10px] text-slate-400">1-click setup</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HISTORICAL_PERSONAS.map((p) => {
                    const isSelected = name === p.name;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectPersona(p)}
                        className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-white hover:bg-neutral-100 border-neutral-200 text-slate-800'
                        }`}
                      >
                        <span className="text-lg">{p.avatarUrl}</span>
                        <div className="min-w-0">
                          <p className="font-bold truncate text-[11px]">{p.name}</p>
                          <p className={`text-[9px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                            {p.subject.split(' ')[0]}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Avatar Selector */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Custom Mentor Avatar</label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setAvatarUrl(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                        avatarUrl === emoji
                          ? 'bg-black text-white border-black scale-110 shadow-md'
                          : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Mentor Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Prof. Feynman, Dr. Turing"
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Academic / Domain Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Quantum Computing, System Design"
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Focus Topic & Syllabus Scope</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Qubit Superposition, Grover's Algorithm, Bell Inequalities"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Custom System Guidelines (Optional)</label>
                <textarea
                  rows={2}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Optional: Specify textbook chapters, interview question types, or specific analogies to use..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          )}

          {/* TAB 2: VOICE & PACING */}
          {activeTab === 'voice' && (
            <div className="space-y-5">
              {/* Voice Picker */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 flex items-center justify-between">
                  <span>Select Voice Persona</span>
                  <span className="text-[11px] font-normal text-slate-400">Curated low-latency neural voices</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {CURATED_VOICES.map((v) => {
                    const isSelected = selectedVoiceId === v.voiceId;
                    return (
                      <button
                        type="button"
                        key={v.voiceId}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedVoiceId(v.voiceId);
                        }}
                        className={`p-3 rounded-2xl border cursor-pointer text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{v.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                        </div>
                        <span className={`text-[10px] mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {v.accent} · {v.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Speaking Pace Selector */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Speaking Pace (Speed)</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'slow', label: '0.75x Slow', desc: 'Deliberate & clear' },
                    { id: 'natural', label: '1.0x Natural', desc: 'Balanced conversation' },
                    { id: 'brisk', label: '1.25x Brisk', desc: 'Fast momentum' },
                    { id: 'fast', label: '1.5x Speed Drill', desc: 'Rapid Q&A' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPace(p.id as MentorPace)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        pace === p.id
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-slate-700'
                      }`}
                    >
                      <p className="font-bold text-xs">{p.label}</p>
                      <p className={`text-[10px] mt-0.5 ${pace === p.id ? 'text-slate-300' : 'text-slate-400'}`}>
                        {p.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEPTH & STYLE */}
          {activeTab === 'pedagogy' && (
            <div className="space-y-5">
              {/* Learning Depth Cards */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-700">Explanation Depth Target</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'overview',
                      title: 'High-Level Overview',
                      desc: 'Big-picture mental models, intuitive analogies, minimal jargon.',
                    },
                    {
                      id: 'deep_dive',
                      title: 'First-Principles Deep Dive',
                      desc: 'Rigorous math proofs, code internals, trade-offs, and failure modes.',
                    },
                    {
                      id: 'exam_drill',
                      title: 'Interview & Exam Drill',
                      desc: 'Fast-paced probing questions, edge-case analysis, and critique.',
                    },
                  ].map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setDepth(d.id as MentorDepth)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        depth === d.id
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{d.title}</span>
                        {depth === d.id && <Check className="w-3.5 h-3.5 text-sky-400" />}
                      </div>
                      <p className={`text-[10px] mt-1.5 leading-relaxed ${depth === d.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {d.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty & Pedagogy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Difficulty Scaffolding</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'beginner', label: 'Beginner' },
                      { id: 'intermediate', label: 'Intermediate' },
                      { id: 'advanced', label: 'Advanced' },
                    ].map((diff) => (
                      <button
                        key={diff.id}
                        type="button"
                        onClick={() => setDifficulty(diff.id as MentorDifficulty)}
                        className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${
                          difficulty === diff.id
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-slate-700'
                        }`}
                      >
                        {diff.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Teaching Style</label>
                  <select
                    value={teachingStyle}
                    onChange={(e) => setTeachingStyle(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-slate-900 text-xs bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="socratic">Socratic (Question-driven inquiry)</option>
                    <option value="direct">Direct & Structured (Step-by-step clarity)</option>
                    <option value="storyteller">Storyteller (Analogy & real-world intuition)</option>
                    <option value="coach">Architectural Coach (Applied critique & best practices)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Actions & Live Mini-Summary */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span className="font-bold text-black">{avatarUrl} {name || 'New Mentor'}</span>
              <span>·</span>
              <span className="capitalize">{pace} pace</span>
              <span>·</span>
              <span className="capitalize">{difficulty}</span>
              <span>·</span>
              <span className="text-slate-400">{selectedVoice.name.split(' ')[0]}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full border border-neutral-200 text-slate-700 font-semibold text-xs hover:bg-neutral-50"
              >
                Cancel
              </button>

              {activeTab !== 'pedagogy' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'basics' ? 'voice' : 'pedagogy')}
                  className="flex-1 sm:flex-none px-5 py-2 rounded-full modern-btn-black text-xs font-semibold"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-2 rounded-full modern-btn-black text-xs font-semibold shadow-lg"
                >
                  {isSubmitting ? 'Provisioning Mentor...' : 'Deploy AI Mentor'}
                </button>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
