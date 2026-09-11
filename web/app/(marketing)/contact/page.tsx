'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Building2, User, Send, Sparkles } from 'lucide-react';

const topicOptions = [
  'Enterprise plan',
  'Custom AI agent',
  'Custom voices / branding',
  'Integration help',
  'Something else',
];

export default function ContactPage() {
  const [topic, setTopic] = useState(topicOptions[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(
        `Thanks ${form.get('name')}! Your ${topic.toLowerCase()} request has been received. We'll reply to ${form.get('email')} within 1 business day.`
      );
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        {/* Left: info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-slate-700">
              <span>Talk to the Atlas team</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              Contact us
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Whether you need an enterprise plan, a fully custom AI agent, or
              help getting started — we answer within one business day.
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="modern-card rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Enterprise &amp; custom agents</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Volume credits, dedicated agents, SSO, admin controls.
                </p>
                <a href="mailto:enterprise@atlas.ai" className="inline-flex items-center gap-1.5 text-sm font-semibold text-black mt-2">
                  <Mail className="w-3.5 h-3.5" /> enterprise@atlas.ai
                </a>
              </div>
            </div>

            <div className="modern-card rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 text-slate-900 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">General support</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Billing, account, or product questions.
                </p>
                <a href="mailto:support@atlas.ai" className="inline-flex items-center gap-1.5 text-sm font-semibold text-black mt-2">
                  <Mail className="w-3.5 h-3.5" /> support@atlas.ai
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 modern-card rounded-3xl p-7 sm:p-9 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Your name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="name" type="text" required placeholder="Jane Doe" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 modern-input" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Work email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="email" type="email" required placeholder="jane@company.com" className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 modern-input" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              What are you reaching out about?
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 modern-input bg-white/60"
              >
                {topicOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Your message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us about your learning goals, team size, or the custom agent you have in mind..."
              className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 modern-input resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold modern-btn-black inline-flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}