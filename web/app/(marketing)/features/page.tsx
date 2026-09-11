import Link from 'next/link';
import { Mic, Eye, BrainCircuit, FileText, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  points: string[];
};

const features: Feature[] = [
  {
    icon: Mic,
    title: 'Conversational Voice Agent',
    tagline: 'Talk to a mentor the way you talk to a person.',
    points: [
      'Real-time, full-duplex voice — interrupt and interject naturally',
      'Custom mentors with chosen voices, subjects, and personalities',
      'Hands-free: practice while commuting, walking, or doing chores',
      'Works across web and mobile with low-latency speech',
    ],
  },
  {
    icon: Eye,
    title: 'Live Visual Companion',
    tagline: 'See what your mentor is saying.',
    points: [
      'Math formulas render as LaTeX in real time',
      'Code snippets appear syntax-highlighted',
      'Key bullet points sync to the conversation',
      'Perfect for code, math, and concept-heavy topics',
    ],
  },
  {
    icon: FileText,
    title: 'Auto Debriefs & Flashcards',
    tagline: 'Every session, summarized automatically.',
    points: [
      'Call ends with a clean summary of what you covered',
      'Knowledge gaps are flagged for review',
      'Spaced-repetition flashcards built from each session',
      'Review on web or mobile in seconds',
    ],
  },
  {
    icon: BrainCircuit,
    title: 'Long-Term Memory',
    tagline: 'Mentors that actually remember you.',
    points: [
      'Past sessions are embedded and stored',
      'Mentors follow up on earlier topics and progress',
      'Every conversation builds on the last one',
      'Personalized pacing across weeks of study',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-slate-700">
          <span>Beyond plain voice AI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
          Built for the way you actually learn
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Real-time AI voice mentorship is the core. These features turn
          talking with a mentor into real, trackable learning.
        </p>
      </div>

      <div className="space-y-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="modern-card rounded-3xl p-7 sm:p-9 grid md:grid-cols-5 gap-6 items-center"
            >
              <div
                className={`md:col-span-2 space-y-3 ${i % 2 === 1 ? 'md:order-2' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-950">{feature.title}</h2>
                </div>
                <p className="text-sm font-semibold text-slate-700">{feature.tagline}</p>
                <p className="text-sm text-slate-500">{feature.points.join(' • ')}</p>
              </div>
              <div
                className={`md:col-span-3 ${i % 2 === 1 ? 'md:order-1' : ''}`}
              >
                <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-4 grid gap-2.5">
                  {feature.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-xl bg-white border border-neutral-200 px-4 py-3 text-sm text-slate-700 shadow-sm"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 sm:p-10 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 pt-1">
          Experience it with your own mentor
        </h2>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full modern-btn-black text-sm font-semibold"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}