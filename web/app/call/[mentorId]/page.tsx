'use client';

import React, { useEffect, useMemo, useRef, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  Footprints,
  Sparkles,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import Vapi from '@vapi-ai/web';
import { IMentor } from '@atlas/types';
import { useVoiceStore, VisualCompanionItem } from '@/stores/useVoiceStore';

const BAR_COUNT = 24;

export default function CallPage({ params }: { params: Promise<{ mentorId: string }> }) {
  const { mentorId } = use(params);
  const router = useRouter();

  const [mentor, setMentor] = useState<IMentor | null>(null);
  const [mentorError, setMentorError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isWalkMode, setIsWalkMode] = useState(true);
  const [isVolumeOff, setIsVolumeOff] = useState(false);
  const [interrupted, setInterrupted] = useState(false);
  const [asrLevel, setAsrLevel] = useState(0);
  const [progressMs, setProgressMs] = useState(0);
  const [transcript, setTranscript] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [companionFeed, setCompanionFeed] = useState<VisualCompanionItem[]>([]);

  const vapiRef = useRef<Vapi | null>(null);
  const callStartRef = useRef<number | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addCompanionItem = useVoiceStore((s) => s.addCompanionItem);

  useEffect(() => {
    let cancelled = false;

    async function loadMentor() {
      try {
        const res = await fetch(`/api/mentors/${mentorId}`);
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || 'Mentor not found');
        if (!cancelled) setMentor(json.data);
      } catch (err: any) {
        if (!cancelled) setMentorError(err.message || 'Could not load mentor');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadMentor();
    return () => {
      cancelled = true;
    };
  }, [mentorId]);

  // Start the Vapi call once the mentor is loaded.
  useEffect(() => {
    if (!mentor?.vapiAssistantId || vapiRef.current) return;

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
    vapiRef.current = vapi;
    setStatus('connecting');

    vapi.on('call-start', () => {
      setStatus('connected');
      callStartRef.current = Date.now();
      progressTimerRef.current = setInterval(
        () => setProgressMs((Date.now() - callStartRef.current!) / 1000),
        1000
      );
    });

    vapi.on('call-end', () => handleEndCall(false));

    vapi.on('speech-start', () => setIsAssistantSpeaking(true));
    vapi.on('speech-end', () => setIsAssistantSpeaking(false));

    vapi.on('volume-level', (level: number) => setAsrLevel(level));

    vapi.on('message', (msg: any) => {
      if (!msg?.type) return;

      if (msg.type === 'user-interrupted') {
        setInterrupted(true);
        setTimeout(() => setInterrupted(false), 1600);
      }

      if (msg.type === 'speech-update') {
        if (msg.role === 'assistant') {
          setIsAssistantSpeaking(msg.status === 'started');
          setIsListening(false);
        } else if (msg.msg?.isFinal && msg.msg?.text) {
          setIsListening(false);
        }
      }

      if (msg.type === 'conversation-update') {
        setIsListening(false);
      }

      if (msg.type === 'transcript' && msg.transcriptType === 'final') {
        const text = (msg.transcript || '').trim();
        if (!text) return;
        const role: 'user' | 'assistant' = msg.role === 'assistant' ? 'assistant' : 'user';
        setTranscript((prev) => [...prev.slice(-50), { role, text }]);
        if (role === 'user') setIsListening(false);
      }

      if (msg.type === 'model-output' && Array.isArray(msg.output)) {
        for (const out of msg.output) {
          if (typeof out?.content === 'string' && out.content) {
            parseCompanionContent(out.content);
          }
        }
      }
    });

    vapi.on('error', (e: any) => {
      console.error('[vapi]', e);
      setStatus('error');
    });

    vapi.start(mentor.vapiAssistantId).catch((err) => {
      console.error('[vapi] start error', err);
      setStatus('error');
    });

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      vapi.stop();
      vapiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentor]);

  function parseCompanionContent(content: string) {
    const blockMatch = content.match(/```([\s\S]*?)```/g);
    if (blockMatch) {
      const now = Date.now();
      blockMatch.forEach((block) => {
        const [lang, ...codeLines] = block.replace(/```/g, '').split('\n');
        const code = codeLines.join('\n').trim();
        if (!code) return;
        const item: VisualCompanionItem = {
          id: `${now}-${Math.random().toString(36).slice(2, 6)}`,
          type: 'code',
          language: lang.trim() || 'code',
          content: code,
          timestamp: now,
        };
        setCompanionFeed((prev) => [item, ...prev].slice(0, 8));
        addCompanionItem(item);
      });
    }
    const formulaMatch = content.match(/\$\$([\s\S]*?)\$\$|\$(.+?)\$/g);
    if (formulaMatch) {
      const now = Date.now();
      formulaMatch.forEach((formula) => {
        const clean = formula.replace(/\$/g, '').trim();
        if (!clean) return;
        const item: VisualCompanionItem = {
          id: `${now}-${Math.random().toString(36).slice(2, 6)}`,
          type: 'formula',
          content: clean,
          timestamp: now,
        };
        setCompanionFeed((prev) => [item, ...prev].slice(0, 8));
        addCompanionItem(item);
      });
    }
  }

  async function handleEndCall(save = true) {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch {
        /* noop */
      }
    }
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (save && callStartRef.current) {
      try {
        const seconds = Math.max(1, Math.round((Date.now() - callStartRef.current) / 1000));
        await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mentorId,
            durationSeconds: seconds,
            summary: transcript
              .map((t) => `${t.role === 'assistant' ? 'AI' : 'User'}: ${t.text}`)
              .join('\n')
              .slice(0, 2000),
          }),
        });
      } catch {
        /* session save is best-effort */
      }
    }
    resetCall();
    router.push('/dashboard');
  }

  function toggleMute() {
    const next = !isMuted;
    setIsMuted(next);
    vapiRef.current?.setMuted(next);
  }

  function toggleVolume() {
    const next = !isVolumeOff;
    setIsVolumeOff(next);
    vapiRef.current?.setVolume(next ? 0 : 1);
  }

  function resetCall() {
    setStatus('idle');
    setIsAssistantSpeaking(false);
    setIsListening(false);
    setAsrLevel(0);
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const barHeights = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => {
        const seed = Math.abs(Math.sin(i * 7.3) * 1.3);
        const base = isMuted ? 0 : seed;
        return base;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [asrLevel, isMuted, isAssistantSpeaking]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-deep-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
        <p className="text-sm text-slate-400 font-medium">Preparing your mentor...</p>
      </div>
    );
  }

  if (mentorError || !mentor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-deep-950 text-white px-6">
        <p className="text-lg font-bold">{mentorError || 'Mentor not found'}</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const statusText =
    status === 'connecting'
      ? 'Connecting to your mentor...'
      : status === 'error'
        ? 'Call failed. Please try again.'
        : isAssistantSpeaking
          ? `${mentor.name} is explaining...`
          : isListening
            ? 'Listening to you...'
            : interrupted
              ? 'Interrupted — what would you like to ask?'
              : 'Say something to your mentor...';

  return (
    <div className="min-h-screen bg-deep-950 text-white selection:bg-white selection:text-black flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-5 sm:px-8 py-4">
        <button
          onClick={() => handleEndCall()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>End & Exit</span>
        </button>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider px-3 py-1 rounded-full border ${
              status === 'connected'
                ? 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10'
                : 'text-amber-300 border-amber-400/30 bg-amber-400/10'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'
              }`}
            />
            {status === 'connected' ? 'LIVE DUPLEX' : 'CONNECTING'}
          </span>
          <span className="text-xs font-mono text-slate-400 tabular-nums">{formatTime(progressMs)}</span>
        </div>
      </header>

      {/* Main Stage — Walk Mode shows audio-first view */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 px-5 sm:px-8 pb-6">
        {/* Left / Center: Voice Orb */}
        <div className={`flex flex-col items-center justify-center ${isWalkMode ? 'flex-1' : ''}`}>
          {/* Mentor Orb */}
          <div className="relative flex items-center justify-center">
            {status === 'connected' && isAssistantSpeaking && (
              <div className="absolute w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-sky-400/20 animate-ping" />
            )}
            {status === 'connected' && isMuted && (
              <div className="absolute w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-rose-400/10 animate-ping" />
            )}

            <div
              className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center text-5xl sm:text-6xl border transition-all duration-500 ${
                status === 'connected'
                  ? 'bg-gradient-to-br from-sky-500/30 to-indigo-600/30 border-sky-300/40 shadow-[0_0_60px_rgba(56,189,248,0.25)]'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {mentor.avatarUrl || '🧑‍🏫'}
            </div>
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight">{mentor.name}</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
            {mentor.subject} · {mentor.topic}
          </p>

          {/* Status + Waveform */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm font-semibold text-sky-200 h-5">{statusText}</p>

            {status === 'connected' && (
              <div className="flex items-end gap-[3px] h-10">
                {barHeights.map((_, i) => {
                  const animate = isAssistantSpeaking || asrLevel > 0.02;
                  const height = animate
                    ? Math.min(40, 4 + (asrLevel || 0.5) * 28 + Math.abs(Math.sin((Date.now() / 160 + i) * 0.7)) * 14)
                    : 4;
                  return (
                    <span
                      key={i}
                      className={`w-1.5 rounded-full ${isMuted ? 'bg-slate-700' : 'bg-sky-400'}`}
                      style={{
                        height: isMuted ? 4 : Math.min(40, height),
                        transition: 'height 120ms ease-out',
                        opacity: isMuted ? 0.4 : 0.9,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                isMuted
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-white/10 border border-white/15 hover:bg-white/20'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleVolume}
              title={isVolumeOff ? 'Unmute speaker' : 'Mute speaker'}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white/10 border border-white/15 hover:bg-white/20 transition-all"
            >
              {isVolumeOff ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsWalkMode((w) => !w)}
              title="Toggle Walk Mode"
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                isWalkMode
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                  : 'bg-white/10 border border-white/15 hover:bg-white/20'
              }`}
            >
              <Footprints className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleEndCall()}
              title="End call"
              className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>

          {isWalkMode && status === 'connected' && (
            <p className="mt-8 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <Footprints className="w-3.5 h-3.5" />
              Walk Mode on — screen can stay off, audio continues in background
            </p>
          )}
        </div>

        {/* Right: Visual Companion + Transcript (hidden in Walk Mode) */}
        {!isWalkMode && (
          <div className="w-full max-w-md lg:max-w-sm flex flex-col gap-4">
            {/* Companion Feed */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>LIVE VISUAL COMPANION</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">auto-sync</span>
              </div>

              {companionFeed.length === 0 ? (
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Code snippets and math formulas your mentor mentions will appear here live.
                </p>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {companionFeed.map((item) => (
                    <div key={item.id} className="rounded-xl bg-black/40 border border-white/10 p-2.5">
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-sky-300/80 mb-1.5">
                        {item.type === 'formula' ? 'Formula' : item.language}
                      </p>
                      <pre className="font-mono text-[11px] text-emerald-300 whitespace-pre-wrap">{item.content}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Transcript */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 space-y-3">
              <p className="text-xs font-bold tracking-wider text-slate-300">
                LIVE TRANSCRIPT
              </p>
              {transcript.length === 0 ? (
                <p className="text-[11px] text-slate-500">Conversation will appear here as it happens.</p>
              ) : (
                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {transcript.map((t, i) => (
                    <div
                      key={i}
                      className={`text-xs leading-relaxed ${t.role === 'assistant' ? 'text-slate-200' : 'text-slate-400 italic'}`}
                    >
                      <span className={`font-bold ${t.role === 'assistant' ? 'text-sky-300' : 'text-slate-500'}`}>
                        {t.role === 'assistant' ? mentor.name : 'You'}:{' '}
                      </span>
                      {t.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}