import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Flashcard } from '@/lib/models/Flashcard';
import { getAuthUser } from '@/lib/auth';
import { calculateSM2, ReviewRating } from '@/lib/anki';
import { ApiResponse, IFlashcard } from '@atlas/types';

interface Params {
  params: Promise<{ id: string }>;
}

// POST /api/flashcards/[id]/review
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { id } = await params;
    const { rating } = (await req.json()) as { rating: ReviewRating };

    if (!rating || !['again', 'hard', 'good', 'easy'].includes(rating)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid rating. Must be again, hard, good, or easy' },
        { status: 400 }
      );
    }

    const card = await Flashcard.findOne({ _id: id, userId: authUser.userId });
    if (!card) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Flashcard not found' },
        { status: 404 }
      );
    }

    // Apply SM-2 Algorithm
    const sm2Result = calculateSM2(
      {
        interval: card.interval || 1,
        repetition: card.repetition || 0,
        easeFactor: card.easeFactor || 2.5,
      },
      rating
    );

    card.interval = sm2Result.interval;
    card.repetition = sm2Result.repetition;
    card.easeFactor = sm2Result.easeFactor;
    card.nextReviewDate = sm2Result.nextReviewDate;

    await card.save();

    return NextResponse.json<ApiResponse<IFlashcard>>({
      success: true,
      data: card.toObject() as unknown as IFlashcard,
      message: `Card scheduled for next review in ${sm2Result.interval} day(s).`,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
