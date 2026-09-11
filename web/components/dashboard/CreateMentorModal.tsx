'use client';

import React, { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface CreateMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMentorCreated: (mentor: any) => void;
}

export function CreateMentorModal({
  isOpen,
  onClose,
  onMentorCreated,
}: CreateMentorModalProps) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [teachingStyle, setTeachingStyle] = useState<'socratic' | 'direct' | 'storyteller' | 'coach'>('socratic');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          systemPrompt,
          voiceId: 'vapi-custom-voice',
          avatarUrl: '🎓',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-neutral-200 text-slate-900 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-950">Create Custom AI Mentor</h3>
              <p className="text-xs text-slate-500">Persisted directly into your MongoDB Atlas cluster.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 text-slate-400 hover:text-black transition-colors"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Mentor Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Prof. Feynman"
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-slate-900 text-xs modern-input"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Academic Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Theoretical Physics"
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-slate-900 text-xs modern-input"
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
              placeholder="e.g. Quantum Electrodynamics & Path Integrals"
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-slate-900 text-xs modern-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Difficulty Target</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-slate-900 text-xs bg-white modern-input"
              >
                <option value="beginner">Beginner (Foundations)</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced (Rigorous)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Teaching Pedagogy</label>
              <select
                value={teachingStyle}
                onChange={(e) => setTeachingStyle(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-slate-900 text-xs bg-white modern-input"
              >
                <option value="socratic">Socratic (Question-driven)</option>
                <option value="direct">Direct & Structured</option>
                <option value="storyteller">Storyteller & Intuition</option>
                <option value="coach">Architectural Coach</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Custom System Prompt / Guidelines</label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Provide special instructions, topics to emphasize, or textbook chapters..."
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-slate-900 text-xs modern-input"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-neutral-200 text-slate-700 font-semibold text-xs hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-full modern-btn-black text-xs font-semibold"
            >
              {isSubmitting ? 'Saving to Database...' : 'Save & Deploy Mentor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
