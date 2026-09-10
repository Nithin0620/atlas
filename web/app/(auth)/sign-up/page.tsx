'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthAnimatedBackground } from '@/components/auth/AuthAnimatedBackground';
import { ArrowLeft, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Account created for: ' + name + ' (' + email + ')');
    }, 800);
  };

  const handleGoogleSignUp = () => {
    alert('Initiating Google OAuth registration...');
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between p-6 sm:p-10 bg-[#01001a] text-white selection:bg-white selection:text-[#01001a]">
      {/* Background Generative Matrix with Floating Top/Bottom Objects */}
      <AuthAnimatedBackground />

      {/* Top Header / Back Nav */}
      <div className="relative z-10 flex items-center justify-between max-w-5xl w-full mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Atlas</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Already have an account?</span>
          <Link
            href="/sign-in"
            className="text-xs font-bold text-white hover:underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Center Form Section - Completely Uncontained / No Cards */}
      <div className="relative z-10 max-w-md w-full mx-auto my-auto py-8">
        
        {/* Title & Brand Presence */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-[#01001a] p-[1px] shadow-lg shadow-white/20 mx-auto mb-2">
            <span className="text-xl font-bold">🪐</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Join <span className="shimmer-text-white">Atlas</span>
          </h1>
          <p className="text-sm text-slate-300">
            Create your account to unlock voice AI tutoring on Web & Mobile
          </p>
        </div>

        {/* 1. Google OAuth Action */}
        <button
          onClick={handleGoogleSignUp}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-sm font-semibold text-white shadow-xl backdrop-blur-xl transition-all duration-200 group active:scale-[0.99]"
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
            <div className="w-full border-t border-white/15" />
          </div>
          <span className="relative px-4 text-xs uppercase tracking-widest text-slate-400 bg-[#01001a] font-medium">
            or register with email
          </span>
        </div>

        {/* 2. Traditional Form Fields (No Card Box, Flowing in Canvas) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
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
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 glass-input focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
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
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 glass-input focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Create Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-10 pr-10 py-3 rounded-xl text-sm text-white placeholder-slate-500 glass-input focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 py-3.5 px-4 rounded-xl text-sm font-semibold glass-button-white flex items-center justify-center gap-2 group transition-all"
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
      <div className="relative z-10 text-center text-xs text-slate-400 max-w-md mx-auto">
        By creating an account, you agree to our Terms of Service & Privacy Policy.
      </div>
    </main>
  );
}
