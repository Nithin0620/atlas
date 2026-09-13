export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export interface SM2State {
  interval: number; // in days
  repetition: number;
  easeFactor: number;
}

export interface SM2Result extends SM2State {
  nextReviewDate: Date;
}

/**
 * SuperMemo-2 (SM-2) Spaced Repetition Algorithm
 * Maps user rating ('again', 'hard', 'good', 'easy') to calculate the next optimal review interval.
 */
export function calculateSM2(
  currentState: SM2State,
  rating: ReviewRating
): SM2Result {
  let { interval, repetition, easeFactor } = currentState;

  // Map rating to SM-2 quality grade (0 to 5 standard scale)
  const gradeMap: Record<ReviewRating, number> = {
    again: 1, // Complete blackout / incorrect
    hard: 2,  // Correct response with major hesitation
    good: 3,  // Correct response with slight hesitation
    easy: 4,  // Perfect response with instant recall
  };

  const grade = gradeMap[rating];

  // Update Ease Factor (minimum floor at 1.3)
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (4 - grade) * (0.08 + (4 - grade) * 0.02))
  );

  // If grade is 'again' (failed) or 'hard'
  if (grade < 3) {
    repetition = 0;
    interval = 1;
  } else {
    // Grade is 'good' or 'easy'
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = rating === 'easy' ? 4 : 2;
    } else {
      interval = Math.round(interval * easeFactor);
      if (rating === 'easy') {
        interval = Math.round(interval * 1.3);
      }
    }
    repetition += 1;
  }

  const nextReviewDate = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

  return {
    interval,
    repetition,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReviewDate,
  };
}
