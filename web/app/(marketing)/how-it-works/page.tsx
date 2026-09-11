import Link from 'next/link';
import { UserPlus, UserCog, Mic, BrainCircuit, TrendingUp, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Step = {
  icon: LucideIcon;
  step: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create your free account',
    body: 'Sign up in under 30 seconds with Google or email. No credit card required — you get 100 free credits to start.',
  },
  {
    icon: UserCog,
    step: '02',
    title: 'Choose or build a mentor',
    body: 'Pick a mentor from the library or build your own: pick a subject, a topic, a voice, and a teaching personality.',
  },
  {
    icon: Mic,
    step: '03',
    title: 'Start a voice session',
    body: 'Hit call and talk naturally, hands-free. Your mentor listens and responds in real time with full-duplex voice.',
  },
  {
    icon: BrainCircuit,
    step: '04',
    title: 'See live visuals while you learn',
    body: 'Math renders as LaTeX, code appears syntax-highlighted, and key points show up as cards synced to the conversation.',
  },
  {
    icon: TrendingUp,
    step: '05',
    title: 'Review debriefs & flashcards',
    body: 'Every session is summarized automatically. Missing knowledge becomes spaced-repetition flashcards, and your mentor remembers everything next time.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-slate-700">
          <span>From zero to learning in five steps</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
          How Atlas works
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Atlas pairs conversational AI mentors with live visual companions and
          long-term memory, so you can learn hands-free and stay sharp.
        </p>
      </div>

      <ol className="relative space-y-8 before:absolute before:left-[22px] sm:before:left-[26px] before:top-3 before:bottom-3 before:w-px before:bg-neutral-200">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.step} className="relative flex gap-5 sm:gap-6">
              <div className="relative z-10 w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-2xl bg-black text-white flex items-center justify-center shrink-0 shadow-md">
                <Icon className="w-5 h-5" />
              </div>
              <div className="modern-card flex-1 rounded-2xl p-5 sm:p-6">
                <span className="text-xs font-bold tracking-widest text-slate-400">
                  STEP {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-950 mt-1">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-14 rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 sm:p-10 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 pt-1">
          Ready to try your first mentor?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
          Start a conversational tutoring session in under 30 seconds with
          100 free credits.
        </p>
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