import Link from 'next/link';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Sparkles, Rocket, Crown, Zap, Building2 } from 'lucide-react';

type Plan = {
  name: string;
  icon: LucideIcon;
  price: string;
  period: string;
  credits: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
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
    cta: { label: 'Get Started Free', href: '/sign-up' },
  },
  {
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
      'Voice cloning',
      'Priority support',
    ],
    cta: { label: 'Start Plus', href: '/sign-up' },
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '$19',
    period: 'per month',
    credits: '2,000 credits',
    tagline: 'For power users and serious study sessions.',
    features: [
      'Unlimited mentors',
      'Long-term memory',
      'Real-time code & math rendering',
      'API access',
      'Priority support',
    ],
    cta: { label: 'Start Pro', href: '/sign-up' },
    highlighted: true,
  },
  {
    name: 'Ultra',
    icon: Zap,
    price: '$49',
    period: 'per month',
    credits: '10,000 credits',
    tagline: 'Maximum credits for non-stop, hands-free learning.',
    features: [
      'Everything in Pro',
      '10,000 monthly credits',
      'Custom agent studio',
      'Advanced analytics',
      'Dedicated support',
    ],
    cta: { label: 'Go Ultra', href: '/sign-up' },
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-slate-700">
          <span>Simple credit-based pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
          Plans that scale with you
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Every tier includes real-time voice tutoring, visual companions, and
          automatic session debriefs. Credits unlock voice minutes and premium
          AI features — once per month, never per session.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
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

              <Link
                href={plan.cta.href}
                className={`w-full text-center py-3 rounded-full text-sm font-semibold ${
                  plan.highlighted ? 'modern-btn-black' : 'modern-btn-outline'
                }`}
              >
                {plan.cta.label}
              </Link>
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
            <h3 className="text-xl font-bold text-slate-950">Enterprise</h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Custom credit volumes, dedicated agents, SSO, admin controls, and
              a named success engineer. Built for teams and institutions.
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