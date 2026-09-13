'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Bookmark, BookOpen, Code2, Sigma } from 'lucide-react';
import katex from 'katex';
import { VisualCompanionItem } from '@/stores/useVoiceStore';

interface LiveVisualCompanionFeedProps {
  items: VisualCompanionItem[];
  onSaveAsFlashcard?: (item: VisualCompanionItem) => void;
}

export function LiveVisualCompanionFeed({ items, onSaveAsFlashcard }: LiveVisualCompanionFeedProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (item: VisualCompanionItem) => {
    setSavedIds((prev) => new Set(prev).add(item.id));
    if (onSaveAsFlashcard) {
      onSaveAsFlashcard(item);
    }
  };

  const renderFormulaHtml = (formula: string) => {
    try {
      const clean = formula.replace(/^\$\$|\$\$$|^\$|\$$/g, '').trim();
      return katex.renderToString(clean, {
        throwOnError: false,
        displayMode: true,
      });
    } catch {
      return formula;
    }
  };

  return (
    <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-5 space-y-4 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-200">
          <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>LIVE VISUAL COMPANION</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-time sync</span>
        </span>
      </div>

      {/* Feed Items */}
      {items.length === 0 ? (
        <div className="py-8 px-4 text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-300">Awaiting visual formulas & code...</p>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
            Formulas, code snippets, and key definitions your mentor mentions will automatically appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {items.map((item) => {
            const isSaved = savedIds.has(item.id);
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-black/50 border border-white/10 p-3.5 space-y-2.5 transition-all hover:border-white/25 shadow-md"
              >
                {/* Item Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-sky-300">
                    {item.type === 'formula' ? (
                      <>
                        <Sigma className="w-3 h-3 text-amber-400" />
                        <span>LaTeX Formula</span>
                      </>
                    ) : item.type === 'concept' ? (
                      <>
                        <BookOpen className="w-3 h-3 text-emerald-400" />
                        <span>Key Takeaway</span>
                      </>
                    ) : (
                      <>
                        <Code2 className="w-3 h-3 text-sky-400" />
                        <span>{item.language || 'Code Snippet'}</span>
                      </>
                    )}
                  </div>

                  {/* Actions: Copy & Save */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.id, item.content)}
                      title="Copy to clipboard"
                      className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors text-[10px]"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>

                    <button
                      onClick={() => handleSave(item)}
                      title={isSaved ? 'Saved to flashcard review queue' : 'Save as flashcard'}
                      className={`p-1 rounded-md transition-colors text-[10px] ${
                        isSaved
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Content Render */}
                {item.type === 'formula' ? (
                  <div
                    className="p-3 rounded-xl bg-slate-950/90 border border-white/5 text-amber-200 overflow-x-auto text-sm text-center font-serif"
                    dangerouslySetInnerHTML={{ __html: renderFormulaHtml(item.content) }}
                  />
                ) : item.type === 'concept' ? (
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/20 text-emerald-300 text-xs leading-relaxed font-sans">
                    <p>{item.content}</p>
                  </div>
                ) : (
                  <pre className="p-3 rounded-xl bg-slate-950/90 border border-white/5 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    <code>{item.content}</code>
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
