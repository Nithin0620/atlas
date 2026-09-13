'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Sparkles, Rocket, Crown, Zap, Building2, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Plan = {
  id: string;
  name: string;
  icon: LucideIcon;
  price: string;
  period: string;
  credits: string;
  tagline: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    icon: Sparkles,
    price: '$0',
    period: 'forever',
    credits: '100 credits',
    tagline: 'Try Atlas and talk to your first mentor.',
    features: [
      '1 custom mentor',
      'Daily voice sessions',
      'Standard voices',
      'Session history (7 days)',
      'Community support',
    ],
    ctaLabel: 'Get Started Free',
  },
  {
    id: 'plus',
    name: 'Plus',
    icon: Rocket,
    price: '$9',
    period: 'per month',
    credits: '500 credits',
    tagline: 'For regular learners building a daily habit.',
    features: [
      'Up to 5 custom mentors',
      'Live visual companion',
      'Session debriefs & flashcards',
      'Voice customization & pacing',
      'Priority support',
    ],
    ctaLabel: 'Upgrade to Plus',
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Crown,
    price: '$19',
    period: 'per month',
    credits: '2,000 credits',
    tagline: 'For power users and serious study sessions.',
    features: [
      'Unlimited mentors',
      'Full Anki SM-2 Spaced Repetition',
      'Real-time KaTeX math & syntax code',
      'Ultra-low latency voices',
      'Priority support',
    ],
    ctaLabel: 'Start Pro Trial',
    highlighted: true,
  },
  {
    id: 'ultra',
    name: 'Ultra',
    icon: Zap,
    price: '$49',
    period: 'per month',
    credits: '10,000 credits',
    tagline: 'Maximum credits for non-stop, hands-free learning.',
    features: [
      'Everything in Pro',
      '10,000 monthly credits',
      'Unlimited Walk Mode hours',
      'Custom Agent Studio',
      'Dedicated support',
    ],
    ctaLabel: 'Go Ultra',
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'free') {
      router.push('/sign-up');
      return;
    }

    setLoadingPlan(planId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();
      if (res.status === 401) {
        // User not logged in -> redirect to sign-up
        router.push(`/sign-up?redirect=pricing&plan=${planId}`);
        return;
      }

      if (data.success && data.data?.url) {
        window.location.href = data.data.url;
      } else {
        router.push('/dashboard');
      }
    } catch {
      router.push('/sign-up');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-slate-700">
          <span>Simple, transparent subscription pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
          Plans that scale with your curiosity
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Every tier includes real-time full-duplex voice tutoring, live visual companions, and Anki SM-2 spaced repetition debriefs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isLoadingThis = loadingPlan === plan.id;

          return (
            <div
              key={plan.name}
              className={`relative modern-card rounded-3xl p-7 flex flex-col gap-5 ${
                plan.highlighted
                  ? 'border-black shadow-[0_0_0_1px_#000000,0_12px_30px_-6px_rgba(0,0,0,0.18)]'
                  : ''
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black text-white text-[11px] font-semibold">
                  Most Popular
                </span>
              )}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-900" />
                </div>
                <h2 className="text-lg font-bold text-slate-950">{plan.name}</h2>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-slate-950">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500">{plan.period}</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-slate-700">
                  {plan.credits} / month
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {plan.tagline}
              </p>

              <ul className="space-y-2.5 mt-auto">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={isLoadingThis}
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full text-center py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  plan.highlighted ? 'modern-btn-black' : 'modern-btn-outline'
                }`}
              >
                {isLoadingThis ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>{plan.ctaLabel}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-950">Enterprise & Universities</h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Custom credit volumes, dedicated institution AI models, SSO, and team analytics. Built for schools and research teams.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 px-7 py-3 rounded-full modern-btn-black text-sm font-semibold inline-flex items-center gap-2"
        >
          <span>Contact Sales</span>
        </Link>
      </div>
    </div>
  );
}