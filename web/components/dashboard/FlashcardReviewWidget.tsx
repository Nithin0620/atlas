'use client';

import React, { useState, useMemo } from 'react';
import { CheckCircle2, RotateCcw, BookOpen, Plus, Sparkles, X, AlertCircle } from 'lucide-react';
import { IFlashcard } from '@atlas/types';

interface FlashcardReviewWidgetProps {
  cards: IFlashcard[];
  onCardUpdated?: () => void;
}

export function FlashcardReviewWidget({ cards: initialCards, onCardUpdated }: FlashcardReviewWidgetProps) {
  const [cards, setCards] = useState<IFlashcard[]>(initialCards || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Card Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [frontInput, setFrontInput] = useState('');
  const [backInput, setBackInput] = useState('');
  const [createError, setCreateError] = useState('');

  React.useEffect(() => {
    setCards(initialCards || []);
  }, [initialCards]);

  const currentCard = useMemo(() => cards[currentIndex], [cards, currentIndex]);

  const handleReview = async (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard?._id) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch(`/api/flashcards/${currentCard._id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });
      if (onCardUpdated) onCardUpdated();
    } catch {
      /* continue to next card */
    } finally {
      setIsSubmitting(false);
      handleNext();
    }
  };

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

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!frontInput || !backInput) {
      setCreateError('Please enter both question and answer.');
      return;
    }

    try {
      const res = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ front: frontInput, back: backInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCards((prev) => [data.data, ...prev]);
        setFrontInput('');
        setBackInput('');
        setIsCreateModalOpen(false);
        setCreateError('');
        if (onCardUpdated) onCardUpdated();
      } else {
        setCreateError(data.error || 'Failed to create flashcard.');
      }
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create flashcard.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
            <span>Daily Spaced-Repetition Review</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-slate-700 font-semibold border border-neutral-200">
              {cards.length} Cards
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Anki SM-2 optimal interval scheduler based on active recall strength.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="text-xs font-semibold px-3 py-1.5 rounded-full modern-btn-outline inline-flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Card</span>
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="glass-card p-8 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-neutral-100 text-slate-600 mx-auto flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-950">No Flashcards Due Today</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Flashcards are generated automatically after voice tutoring calls or you can add custom cards using the button above.
          </p>
        </div>
      ) : !completed && currentCard ? (
        <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-neutral-100 pb-3">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-sky-500" />
              <span>Recall Review</span>
            </span>
            <span className="font-mono text-[11px] bg-neutral-100 px-2 py-0.5 rounded-full">
              Card {currentIndex + 1} of {cards.length}
            </span>
          </div>

          {/* Flashcard Body */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`cursor-pointer min-h-[160px] p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3 ${
              isFlipped
                ? 'bg-slate-950 text-white border-slate-900 shadow-xl'
                : 'bg-neutral-50 hover:bg-neutral-100/80 border-neutral-200 text-slate-900'
            }`}
          >
            <span className={`text-[10px] uppercase font-bold tracking-widest ${isFlipped ? 'text-sky-400' : 'text-slate-400'}`}>
              {isFlipped ? 'ANSWER / CORE EXPLANATION' : 'QUESTION / CONCEPT (CLICK TO FLIP)'}
            </span>

            <p className="text-base sm:text-lg font-bold max-w-lg leading-relaxed">
              {isFlipped ? currentCard.back : currentCard.front}
            </p>

            <span className={`text-xs italic ${isFlipped ? 'text-slate-400' : 'text-slate-400'}`}>
              {isFlipped ? 'Tap to flip back' : 'Tap to reveal answer'}
            </span>
          </div>

          {/* SM-2 Rating Buttons */}
          {isFlipped ? (
            <div className="space-y-2">
              <p className="text-[11px] text-center text-slate-500 font-medium">How easily did you recall this concept?</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  disabled={isSubmitting}
                  onClick={() => handleReview('again')}
                  className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all shadow-sm active:scale-95"
                >
                  <p className="font-bold">Again</p>
                  <p className="text-[10px] opacity-75">1 Day</p>
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => handleReview('hard')}
                  className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold transition-all shadow-sm active:scale-95"
                >
                  <p className="font-bold">Hard</p>
                  <p className="text-[10px] opacity-75">2 Days</p>
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => handleReview('good')}
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-all shadow-sm active:scale-95"
                >
                  <p className="font-bold">Good</p>
                  <p className="text-[10px] opacity-75">4 Days</p>
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => handleReview('easy')}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 text-white hover:bg-black text-xs font-semibold transition-all shadow-sm active:scale-95"
                >
                  <p className="font-bold">Easy</p>
                  <p className="text-[10px] text-slate-300">7+ Days</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center pt-1">
              <button
                onClick={() => setIsFlipped(true)}
                className="px-6 py-2.5 rounded-full modern-btn-black text-xs font-semibold hover:scale-105 transition-transform"
              >
                Reveal Answer
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="glass-card p-8 rounded-3xl bg-white/70 backdrop-blur-glass border border-white/50 shadow-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-black text-white mx-auto flex items-center justify-center text-xl shadow-md">
            <CheckCircle2 className="w-6 h-6 text-sky-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-950">Daily Review Deck Completed!</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            All cards for today have been reviewed. Anki SM-2 retention intervals have been recalculated and scheduled.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full modern-btn-outline text-xs font-semibold hover:bg-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice Deck Again</span>
          </button>
        </div>
      )}

      {/* Modal: Add Custom Flashcard */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200 text-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-slate-950">Create Spaced-Repetition Card</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-100 text-slate-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreateCard} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Front (Question or Concept)</label>
                <textarea
                  rows={2}
                  required
                  value={frontInput}
                  onChange={(e) => setFrontInput(e.target.value)}
                  placeholder="e.g. What is the CAP Theorem trade-off during network partitions?"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Back (Answer & Explanation)</label>
                <textarea
                  rows={3}
                  required
                  value={backInput}
                  onChange={(e) => setBackInput(e.target.value)}
                  placeholder="e.g. In the presence of a network partition (P), a distributed system must choose between Availability (A) and Consistency (C)."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-neutral-200 text-slate-700 font-semibold text-xs hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full modern-btn-black text-xs font-semibold"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(FlashcardReviewWidget);
