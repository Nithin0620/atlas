'use client';

import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, BookOpen } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
}

interface FlashcardReviewWidgetProps {
  cards: Flashcard[];
}

export function FlashcardReviewWidget({ cards }: FlashcardReviewWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(false);
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Daily Spaced-Repetition Review</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Anki SM-2 retention cards generated from difficult concepts.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl modern-card text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-neutral-100 text-slate-600 mx-auto flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-950">No Flashcards Due Today</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Flashcards are generated automatically after voice tutoring sessions to help consolidate difficult concepts into long-term memory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
            <span>Daily Spaced-Repetition Review</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-slate-700 font-semibold">
              {cards.length} Due
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Retention cards automatically generated from difficult topics discussed during voice calls.
          </p>
        </div>
      </div>

      {!completed && currentCard ? (
        <div className="p-6 sm:p-8 rounded-3xl modern-card space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-neutral-100 pb-3">
            <span className="font-semibold text-slate-700">
              {currentCard.category || 'Review Question'}
            </span>
            <span className="font-mono">
              Card {currentIndex + 1} of {cards.length}
            </span>
          </div>

          {/* Card Body */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[140px] p-6 rounded-2xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 flex flex-col items-center justify-center text-center space-y-3 transition-all"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {isFlipped ? 'ANSWER / EXPLANATION' : 'QUESTION / PROMPT (CLICK TO FLIP)'}
            </span>

            <p className="text-base sm:text-lg font-bold text-slate-950 max-w-lg leading-relaxed">
              {isFlipped ? currentCard.back : currentCard.front}
            </p>

            <span className="text-xs text-slate-400 italic">
              {isFlipped ? 'Click again to flip back' : 'Tap to reveal answer'}
            </span>
          </div>

          {/* Rating Buttons when flipped */}
          {isFlipped ? (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors"
              >
                Again (&lt;1 min)
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold transition-colors"
              >
                Hard (12 hours)
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors"
              >
                Good (1 day)
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black text-xs font-semibold transition-colors shadow-sm"
              >
                Easy (4 days)
              </button>
            </div>
          ) : (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setIsFlipped(true)}
                className="px-6 py-2.5 rounded-full modern-btn-black text-xs font-semibold"
              >
                Show Answer
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-3xl modern-card text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-neutral-100 text-black mx-auto flex items-center justify-center text-xl shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-lg font-bold text-slate-950">Daily Review Deck Completed!</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You reviewed all {cards.length} cards scheduled for today. Your retention interval has been updated in the Anki scheduler.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full modern-btn-outline text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
