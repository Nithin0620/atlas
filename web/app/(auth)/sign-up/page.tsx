'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthAnimatedBackground } from '@/components/auth/AuthAnimatedBackground';
import { AuthVoiceBanner } from '@/components/auth/AuthVoiceBanner';
import { ArrowLeft, Mail, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          router.replace('/dashboard');
        }
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to create account. Please check your information.');
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    alert('Google OAuth registration is configured for production redirect.');
  };

  return (
    <main className="relative min-h-screen flex flex-col lg:flex-row text-slate-900 selection:bg-black selection:text-white overflow-x-hidden">
      {/* Background Subtle Grid */}
      <AuthAnimatedBackground />

      {/* LEFT 50% SECTION: Sign Up Form & Controls */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 min-h-screen">
        {/* Top Header / Back Nav */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Atlas</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">Already have an account?</span>
            <Link
              href="/sign-in"
              className="font-bold text-black hover:underline transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Center Form Section */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          {/* Title & Brand Presence */}
          <div className="text-left space-y-2 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-sm font-bold shadow-sm mb-1">
              ✦
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-slate-500">
              Unlock conversational voice AI tutoring on Web and Mobile
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Google OAuth Action */}
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 group active:scale-[0.99]"
          >
            {/* Google SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.6 3.6 1.8 7.3l3.7 2.9C6.4 7.4 8.9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
              />
              <path
                fill="#FBBC05"
                d="M5.5 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.8 7.3C.7 9.5 0 12 0 14.8s.7 5.3 1.8 7.5l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.6-2.4-6.5-5.2L1.8 16.5C3.6 20.2 7.4 23.5 12 23.5z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <span className="relative px-4 text-xs uppercase tracking-wider text-slate-400 bg-white font-medium">
              or register with email
            </span>
          </div>

          {/* 2. Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 modern-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 modern-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Create Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 modern-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl text-sm font-semibold modern-btn-black flex items-center justify-center gap-2 group transition-all"
            >
              {isLoading ? (
                <span className="inline-block animate-spin">⏳</span>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom Footer Details */}
        <div className="w-full max-w-md mx-auto text-left text-xs text-slate-400">
          By creating an account, you agree to our Terms of Service & Privacy Policy.
        </div>
      </div>

      {/* RIGHT 50% SECTION: Modern Voice AI Showcase Banner */}
      <div className="relative z-10 w-full lg:w-1/2 hidden lg:flex flex-col">
        <AuthVoiceBanner mode="sign-up" />
      </div>
    </main>
  );
}
