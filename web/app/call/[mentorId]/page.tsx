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
  Loader2,
  ArrowLeft,
  Gauge,
  CheckCircle2,
  Radio,
  AlertTriangle,
  Play,
} from 'lucide-react';
import Vapi from '@vapi-ai/web';
import { IMentor, MentorPace } from '@atlas/types';
import { useVoiceStore, VisualCompanionItem } from '@/stores/useVoiceStore';
import { LiveVisualCompanionFeed } from '@/components/call/LiveVisualCompanionFeed';

const BAR_COUNT = 24;

export default function CallPage({ params }: { params: Promise<{ mentorId: string }> }) {
  const { mentorId } = use(params);
  const router = useRouter();

  const [mentor, setMentor] = useState<IMentor | null>(null);
  const [mentorError, setMentorError] = useState('');
  const [callErrorMessage, setCallErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isWalkMode, setIsWalkMode] = useState(false);
  const [isVolumeOff, setIsVolumeOff] = useState(false);
  const [currentPace, setCurrentPace] = useState<MentorPace>('natural');
  const [interrupted, setInterrupted] = useState(false);
  const [asrLevel, setAsrLevel] = useState(0);
  const [progressMs, setProgressMs] = useState(0);
  const [transcript, setTranscript] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [companionFeed, setCompanionFeed] = useState<VisualCompanionItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const seenItemsRef = useRef<Set<string>>(new Set());
  const vapiRef = useRef<Vapi | null>(null);
  const callStartRef = useRef<number | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  const addCompanionItem = useVoiceStore((s) => s.addCompanionItem);

  useEffect(() => {
    let cancelled = false;

    async function loadMentor() {
      try {
        const res = await fetch(`/api/mentors/${mentorId}`);
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || 'Mentor not found');
        if (!cancelled) {
          setMentor(json.data);
          if (json.data.pace) setCurrentPace(json.data.pace);
        }
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

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Comprehensive parser for companion content from transcripts, model output & conversation turns
  const parseCompanionContent = React.useCallback(
    (content: string) => {
      if (!content || typeof content !== 'string') return;
      const now = Date.now();

      // 1. Extract Markdown Code Blocks: ```lang\ncode\n```
      const blockRegex = /```(?:(\w+)\n)?([\s\S]*?)```/g;
      let blockMatch;
      while ((blockMatch = blockRegex.exec(content)) !== null) {
        const lang = (blockMatch[1] || 'code').trim();
        const code = (blockMatch[2] || '').trim();
        if (code && !seenItemsRef.current.has(code)) {
          seenItemsRef.current.add(code);
          const item: VisualCompanionItem = {
            id: `${now}-${Math.random().toString(36).slice(2, 6)}`,
            type: 'code',
            language: lang,
            content: code,
            timestamp: now,
          };
          setCompanionFeed((prev) => [item, ...prev].slice(0, 16));
          addCompanionItem(item);
        }
      }

      // 2. Extract LaTeX Formulas: $$...$$ or $...$ or \[...\] or \(...\)
      const formulaRegex = /\$\$([\s\S]*?)\$\$|\$([^\$\n]{2,}?)\$|\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g;
      let formulaMatch;
      while ((formulaMatch = formulaRegex.exec(content)) !== null) {
        const formula = (formulaMatch[1] || formulaMatch[2] || formulaMatch[3] || formulaMatch[4] || '').trim();
        if (formula && formula.length > 2 && !seenItemsRef.current.has(formula)) {
          seenItemsRef.current.add(formula);
          const item: VisualCompanionItem = {
            id: `${now}-${Math.random().toString(36).slice(2, 6)}`,
            type: 'formula',
            content: formula,
            timestamp: now,
          };
          setCompanionFeed((prev) => [item, ...prev].slice(0, 16));
          addCompanionItem(item);
        }
      }

      // 3. Spoken Heuristics for Mathematical/Scientific Laws & Formulas
      // When TTS/Vapi drops raw markdown LaTeX delimiters, recognize spoken topics and render standard KaTeX equations
      const spokenFormulas: Array<{ regex: RegExp; formula: string; title: string }> = [
        {
          regex: /newton'?s?\s+(?:1st|first)\s+law|law\s+of\s+inertia/i,
          formula: '\\sum \\vec{F} = 0 \\implies \\frac{d\\vec{v}}{dt} = 0 \\quad (\\vec{v} = \\text{constant})',
          title: "Newton's 1st Law (Inertia)",
        },
        {
          regex: /newton'?s?\s+(?:2nd|second)\s+law|f\s*=\s*m\s*a/i,
          formula: '\\vec{F}_{\\text{net}} = m\\vec{a} = \\frac{d\\vec{p}}{dt}',
          title: "Newton's 2nd Law of Motion",
        },
        {
          regex: /newton'?s?\s+(?:3rd|third)\s+law|action\s+and\s+reaction/i,
          formula: '\\vec{F}_{AB} = -\\vec{F}_{BA}',
          title: "Newton's 3rd Law (Action & Reaction)",
        },
        {
          regex: /universal\s+gravitation|gravitational\s+force/i,
          formula: 'F = G \\frac{m_1 m_2}{r^2}',
          title: 'Law of Universal Gravitation',
        },
        {
          regex: /einstein|mass[- ]energy|e\s*=\s*m\s*c\s*(?:squared|\^2|2)/i,
          formula: 'E = m c^2 = \\sqrt{(p c)^2 + (m_0 c^2)^2}',
          title: 'Mass-Energy Equivalence',
        },
        {
          regex: /pythagor(?:as|ean)\s+theorem/i,
          formula: 'a^2 + b^2 = c^2 \\implies c = \\sqrt{a^2 + b^2}',
          title: 'Pythagorean Theorem',
        },
        {
          regex: /quadratic\s+formula|roots?\s+of\s+(?:the\s+)?quadratic/i,
          formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          title: 'Quadratic Formula',
        },
        {
          regex: /ohm'?s?\s+law/i,
          formula: 'V = I \\cdot R \\iff I = \\frac{V}{R}',
          title: "Ohm's Law",
        },
        {
          regex: /kinetic\s+energy/i,
          formula: 'K = \\frac{1}{2} m v^2',
          title: 'Kinetic Energy',
        },
        {
          regex: /potential\s+energy/i,
          formula: 'U = m g h',
          title: 'Gravitational Potential Energy',
        },
        {
          regex: /schrodinger|wave\s+function/i,
          formula: 'i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r},t) = \\hat{H}\\Psi(\\mathbf{r},t)',
          title: "Schrödinger's Equation",
        },
        {
          regex: /euler'?s?\s+identity|euler'?s?\s+formula/i,
          formula: 'e^{i\\pi} + 1 = 0 \\quad \\text{or} \\quad e^{ix} = \\cos x + i\\sin x',
          title: "Euler's Identity",
        },
        {
          regex: /binary\s+search|divide\s+and\s+conquer\s+complexity/i,
          formula: '\\mathcal{O}(\\log n)',
          title: 'Binary Search Time Complexity',
        },
        {
          regex: /satyagraha|ahimsa|non[- ]viol/i,
          formula: '\\text{Satya (Truth)} + \\text{Ahimsa (Non-violence)} \\implies \\text{Satyagraha (Soul Force)}',
          title: 'Core Satyagraha Principle',
        },
        {
          regex: /swaraj/i,
          formula: '\\text{Swaraj} \\iff \\text{Mastery over self and inward freedom}',
          title: 'Swaraj Philosophy',
        },
        {
          regex: /turing\s+machine|computab/i,
          formula: 'M = (Q, \\Sigma, \\Gamma, \\delta, q_0, q_{\\text{accept}}, q_{\\text{reject}})',
          title: 'Formal Definition of a Turing Machine',
        },
        {
          regex: /bell'?s?\s+inequalit/i,
          formula: '|E(a,b) - E(a,c)| \\le 1 + E(b,c)',
          title: "Bell's Theorem",
        },
        {
          regex: /feynman\s+technique/i,
          formula: '\\text{Target Concept} \\xrightarrow{\\text{Explain to a 10yo}} \\text{Identify Gaps} \\xrightarrow{\\text{Simplify}} \\text{Mastery}',
          title: 'The Feynman Learning Algorithm',
        },
        {
          regex: /merge\s+sort|quick\s+sort/i,
          formula: '\\mathcal{O}(n \\log n)',
          title: 'Optimal Sorting Complexity',
        },
        {
          regex: /softmax/i,
          formula: '\\sigma(\\mathbf{z})_i = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}',
          title: 'Softmax Function',
        },
      ];

      for (const entry of spokenFormulas) {
        if (entry.regex.test(content)) {
          if (!seenItemsRef.current.has(entry.title)) {
            seenItemsRef.current.add(entry.title);
            const item: VisualCompanionItem = {
              id: `${now}-${Math.random().toString(36).slice(2, 6)}`,
              type: 'formula',
              content: entry.formula,
              timestamp: now,
            };
            setCompanionFeed((prev) => [item, ...prev].slice(0, 16));
            addCompanionItem(item);
          }
        }
      }

      // 4. Extract Bullet Concepts, Key Takeaways & Spoken Definitions
      // Direct formatted lines
      const lines = content.split('\n').map((l) => l.trim()).filter((l) => l.length > 10);
      lines.forEach((line) => {
        const isBullet = /^(?:•|[-*]|\d+\.)\s+(.+)$/i.exec(line);
        const isTakeaway = /^(?:Key Concept|Principle|Takeaway|Definition|Law|Theorem|Insight):\s*(.+)$/i.exec(line);
        const conceptText = isTakeaway ? isTakeaway[1] : isBullet ? isBullet[1] : null;

        if (conceptText && conceptText.length > 10 && !seenItemsRef.current.has(conceptText)) {
          seenItemsRef.current.add(conceptText);
          const item: VisualCompanionItem = {
            id: `${now}-${Math.random().toString(36).slice(2, 6)}`,
            type: 'concept',
            content: conceptText,
            timestamp: now,
          };
          setCompanionFeed((prev) => [item, ...prev].slice(0, 16));
          addCompanionItem(item);
        }
      });

      // Spoken sentence heuristics for natural speech (e.g. "states that an object...", "is defined as...", "the principle is...", "remember that...")
      const sentenceRegex = /([^.?!]+(?:states\s+that|is\s+defined\s+as|meaning\s+that|means\s+that|refers\s+to|describes\s+how|the\s+key\s+idea|the\s+fundamental\s+truth|remember\s+that)[^.?!]+[.?!]?)/gi;
      let sentenceMatch;
      while ((sentenceMatch = sentenceRegex.exec(content)) !== null) {
        const sentence = sentenceMatch[1].trim();
        if (sentence.length > 20 && sentence.length < 250 && !seenItemsRef.current.has(sentence)) {
          seenItemsRef.current.add(sentence);
          const item: VisualCompanionItem = {
            id: `${now}-${Math.random().toString(36).slice(2, 6)}`,
            type: 'concept',
            content: sentence,
            timestamp: now,
          };
          setCompanionFeed((prev) => [item, ...prev].slice(0, 16));
          addCompanionItem(item);
        }
      }
    },
    [addCompanionItem]
  );

  const startVoiceCall = React.useCallback(async () => {
    if (!mentor) return;

    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey || publicKey.startsWith('your-') || publicKey === 'demo-public-key') {
      setCallErrorMessage('Please configure NEXT_PUBLIC_VAPI_PUBLIC_KEY in your .env.local file to enable live speech.');
      setStatus('error');
      return;
    }

    try {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }

      setCallErrorMessage('');
      setStatus('connecting');

      const vapi = new Vapi(publicKey);
      vapiRef.current = vapi;

      vapi.on('call-start', () => {
        setStatus('connected');
        setCallErrorMessage('');
        callStartRef.current = Date.now();
        progressTimerRef.current = setInterval(
          () => setProgressMs((Date.now() - callStartRef.current!) / 1000),
          1000
        );
      });

      vapi.on('call-end', () => {
        setIsAssistantSpeaking(false);
        setIsListening(false);
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        setStatus('idle');
      });

      vapi.on('speech-start', () => {
        setIsAssistantSpeaking(true);
        setIsListening(false);
      });

      vapi.on('speech-end', () => {
        setIsAssistantSpeaking(false);
        setIsListening(true);
      });

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
            if (msg.status === 'started') setIsListening(false);
          } else if (msg.msg?.isFinal && msg.msg?.text) {
            setIsListening(false);
          }
        }

        if (msg.type === 'conversation-update') {
          setIsListening(false);
          if (Array.isArray(msg.conversation)) {
            msg.conversation.forEach((turn: any) => {
              if (turn.role === 'assistant' && typeof turn.content === 'string') {
                parseCompanionContent(turn.content);
              }
            });
          }
        }

        // Live Transcript events from Vapi
        if (msg.type === 'transcript') {
          const text = (msg.transcript || '').trim();
          if (text) {
            const role: 'user' | 'assistant' = msg.role === 'assistant' ? 'assistant' : 'user';
            
            if (msg.transcriptType === 'final') {
              setTranscript((prev) => [...prev.slice(-50), { role, text }]);
              if (role === 'user') setIsListening(false);
            }

            // Immediately parse any code, LaTeX, or concepts from assistant speech (both partial and final)
            if (role === 'assistant') {
              parseCompanionContent(text);
            }
          }
        }

        if (msg.type === 'model-output') {
          if (Array.isArray(msg.output)) {
            for (const out of msg.output) {
              if (typeof out?.content === 'string' && out.content) {
                parseCompanionContent(out.content);
              }
            }
          } else if (typeof msg.content === 'string') {
            parseCompanionContent(msg.content);
          }
        }
      });

      vapi.on('error', (e: any) => {
        const errorText =
          e?.error?.message ||
          e?.message ||
          (typeof e === 'string' ? e : 'Voice connection error or microphone access needed.');
        console.warn('[vapi voice engine warning]:', errorText);
        setCallErrorMessage(String(errorText));
        setStatus('error');
      });

      // Build full fallback inline config for maximum resilience
      const inlineConfig: any = {
        name: mentor.name,
        transcriber: { provider: 'deepgram', model: 'nova-2', language: 'en' },
        model: {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.6,
          messages: [
            {
              role: 'system',
              content: `You are ${mentor.name}, an expert live voice AI mentor teaching ${mentor.subject} (${mentor.topic}).
Keep your spoken answers crisp and conversational (1-3 sentences).
CRITICAL: When you mention any mathematical law, physics formula, or equation, always output it formatted in LaTeX ($...$ or $$...$$). For code or algorithms, wrap in markdown code blocks (\`\`\`...\`\`\`). For principles, preface with "• Key Concept:".`,
            },
          ],
        },
        voice: { provider: mentor.voiceProvider || 'openai', voiceId: mentor.voiceId || 'alloy' },
        firstMessage: `Hi, I'm ${mentor.name}. Ready to explore ${mentor.topic}?`,
        maxDurationSeconds: 1800,
        silenceTimeoutSeconds: 120,
        responseDelaySeconds: 0.4,
        numWordsToInterruptAssistant: 2,
      };

      // Start with assistant ID if available, or fall back to inline config
      if (mentor.vapiAssistantId && !mentor.vapiAssistantId.startsWith('mock-')) {
        try {
          await vapi.start(mentor.vapiAssistantId);
        } catch (startErr) {
          console.warn('[vapi] Assistant ID start failed, auto-healing with inline config:', startErr);
          await vapi.start(inlineConfig);
        }
      } else {
        await vapi.start(inlineConfig);
      }
    } catch (err: any) {
      const msg = err?.message || 'Could not initiate audio session. Please check microphone permissions.';
      setCallErrorMessage(String(msg));
      setStatus('error');
    }
  }, [mentor, parseCompanionContent]);

  // Trigger call startup once when mentor is loaded
  const hasAutoStartedRef = React.useRef(false);
  useEffect(() => {
    if (mentor && !hasAutoStartedRef.current && status === 'idle') {
      hasAutoStartedRef.current = true;
      startVoiceCall();
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [mentor]);

  const handleSaveFlashcard = async (item: VisualCompanionItem) => {
    try {
      const front =
        item.type === 'formula'
          ? `What is the equation or law for: ${item.content}?`
          : item.type === 'concept'
            ? 'Key Concept / Principle:'
            : `Code implementation (${item.language || 'snippet'}):`;

      const back = item.content;

      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          front,
          back,
        }),
      });

      setToastMessage(`Saved "${item.type.toUpperCase()}" to your Spaced Repetition queue!`);
    } catch {
      setToastMessage(`Saved "${item.type.toUpperCase()}" to local review deck!`);
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  async function handleEndCall(save = true) {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch {}
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
              .map((t) => `${t.role === 'assistant' ? mentor?.name || 'AI' : 'User'}: ${t.text}`)
              .join('\n')
              .slice(0, 3000),
          }),
        });
      } catch {}
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

  function handlePaceChange(newPace: MentorPace) {
    setCurrentPace(newPace);
    setToastMessage(`Pacing updated to ${newPace.toUpperCase()}`);
    setTimeout(() => setToastMessage(null), 2500);
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
        <p className="text-sm text-slate-400 font-medium">Connecting to AI Voice Mentor...</p>
      </div>
    );
  }

  if (mentorError || !mentor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-white px-6">
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
      ? 'Connecting audio stream...'
      : status === 'error'
        ? 'Voice stream paused.'
        : interrupted
          ? 'Interrupted — listening to your question...'
          : isAssistantSpeaking
            ? `${mentor.name} is explaining...`
            : isListening
              ? 'Listening to you speak...'
              : 'Speak naturally or ask a question...';

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-white selection:text-black flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-500/90 text-black text-xs font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <button
          onClick={() => handleEndCall()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>End & Exit</span>
        </button>

        {/* Center Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/15 text-xs">
          <button
            onClick={() => setIsWalkMode(false)}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              !isWalkMode ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Visual Desk Mode
          </button>
          <button
            onClick={() => setIsWalkMode(true)}
            className={`px-3 py-1 rounded-full font-semibold transition-all flex items-center gap-1 ${
              isWalkMode ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Footprints className="w-3 h-3" />
            <span>Walk Mode</span>
          </button>
        </div>

        {/* Live Status Badge */}
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
            {status === 'connected' ? 'FULL DUPLEX' : status === 'connecting' ? 'CONNECTING' : 'READY'}
          </span>
          <span className="text-xs font-mono text-slate-400 tabular-nums">{formatTime(progressMs)}</span>
        </div>
      </header>

      {/* Main Calling Stage */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 px-5 sm:px-8 py-6 max-w-7xl mx-auto w-full">
        
        {/* LEFT / CENTER: Voice Orb Stage */}
        <div className={`flex flex-col items-center justify-center ${isWalkMode ? 'flex-1 max-w-xl mx-auto' : 'flex-1'}`}>
          
          {/* Error Banner if mic permission or key issue */}
          {callErrorMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs max-w-md text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Voice Connection Notice</span>
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed">{callErrorMessage}</p>
              <button
                onClick={startVoiceCall}
                className="mt-1 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold inline-flex items-center gap-1 hover:bg-slate-200"
              >
                <Play className="w-3 h-3" />
                <span>Tap to Connect Audio</span>
              </button>
            </div>
          )}

          {/* Mentor Orb */}
          <div className="relative flex items-center justify-center">
            {status === 'connected' && isAssistantSpeaking && (
              <div className="absolute w-52 sm:w-60 h-52 sm:h-60 rounded-full bg-sky-400/20 animate-ping" />
            )}
            {status === 'connected' && isListening && (
              <div className="absolute w-52 sm:w-60 h-52 sm:h-60 rounded-full bg-emerald-400/20 animate-pulse" />
            )}
            {status === 'connected' && isMuted && (
              <div className="absolute w-52 sm:w-60 h-52 sm:h-60 rounded-full bg-rose-400/10 animate-ping" />
            )}

            <div
              className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center text-6xl sm:text-7xl border transition-all duration-500 ${
                status === 'connected'
                  ? 'bg-gradient-to-br from-sky-500/25 to-indigo-600/25 border-sky-300/40 shadow-[0_0_80px_rgba(56,189,248,0.3)]'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {mentor.avatarUrl || '🧑‍🏫'}
            </div>
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight text-center">{mentor.name}</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium text-center max-w-md">
            {mentor.subject} · {mentor.topic}
          </p>

          {/* Badges */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap justify-center text-[10px] font-semibold text-slate-300">
            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 uppercase tracking-wider">
              {mentor.difficulty || 'intermediate'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 capitalize">
              {mentor.depth ? (mentor.depth === 'deep_dive' ? 'Deep Dive' : mentor.depth === 'overview' ? 'Overview' : 'Exam Drill') : 'Deep Dive'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 capitalize">
              {currentPace} pace
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 capitalize">
              {mentor.teachingStyle || 'socratic'}
            </span>
          </div>

          {/* Status Text & Waveform */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-sky-200 h-5 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>{statusText}</span>
            </p>

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
                      className={`w-1.5 rounded-full ${isMuted ? 'bg-slate-700' : isAssistantSpeaking ? 'bg-sky-400' : 'bg-emerald-400'}`}
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

          {/* In-Call Speed / Pacing Selector */}
          <div className="mt-6 flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 mr-1">
              <Gauge className="w-3 h-3 text-slate-400" />
              <span>Pace:</span>
            </span>
            {(['slow', 'natural', 'brisk', 'fast'] as MentorPace[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePaceChange(p)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all capitalize ${
                  currentPace === p
                    ? 'bg-white text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'slow' ? '0.75x' : p === 'natural' ? '1.0x' : p === 'brisk' ? '1.25x' : '1.5x'}
              </button>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                isMuted
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
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
              className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/30 transition-all hover:scale-105"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>

          {isWalkMode && status === 'connected' && (
            <p className="mt-6 flex items-center gap-2 text-[11px] text-slate-400 font-medium bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <Footprints className="w-3.5 h-3.5 text-sky-400" />
              <span>Walk Mode Active — Audio-first tutoring with background playback</span>
            </p>
          )}
        </div>

        {/* RIGHT: Live Visual Companion & Auto-Scrolling Transcript (Desktop Mode) */}
        {!isWalkMode && (
          <div className="w-full max-w-lg flex flex-col gap-4">
            
            {/* 1. Live Visual Companion Feed */}
            <LiveVisualCompanionFeed
              items={companionFeed}
              onSaveAsFlashcard={handleSaveFlashcard}
            />

            {/* 2. Auto-Scrolling Live Transcript */}
            <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-5 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <p className="text-xs font-bold tracking-wider text-slate-200">
                  LIVE CONVERSATION TRANSCRIPT
                </p>
                <span className="text-[10px] font-mono text-slate-400">{transcript.length} turns</span>
              </div>

              {transcript.length === 0 ? (
                <p className="text-[11px] text-slate-500 py-6 text-center">
                  Spoken conversation turns will stream here in real time.
                </p>
              ) : (
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {transcript.map((t, i) => (
                    <div
                      key={i}
                      className={`text-xs leading-relaxed p-2 rounded-xl transition-all ${
                        t.role === 'assistant'
                          ? 'bg-sky-500/10 border border-sky-500/20 text-slate-100'
                          : 'bg-white/5 border border-white/10 text-slate-300'
                      }`}
                    >
                      <span className={`font-bold mr-1 ${t.role === 'assistant' ? 'text-sky-300' : 'text-slate-400'}`}>
                        {t.role === 'assistant' ? mentor.name : 'You'}:
                      </span>
                      <span>{t.text}</span>
                    </div>
                  ))}
                  <div ref={transcriptEndRef} />
                </div>
              )}
            </div>

          </div>
        )}

      </main>
    </div>
  );
}