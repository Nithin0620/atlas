import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Flashcard } from '@/lib/models/Flashcard';
import { getAuthUser } from '@/lib/auth';
import { ApiResponse, IFlashcard } from '@atlas/types';

// GET /api/flashcards?due=true
export async function GET(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const dueOnly = searchParams.get('due') === 'true';

    const filter: any = { userId: authUser.userId };
    if (dueOnly) {
      filter.nextReviewDate = { $lte: new Date() };
    }

    const cards = await Flashcard.find(filter).sort({ nextReviewDate: 1 }).lean();

    return NextResponse.json<ApiResponse<IFlashcard[]>>({
      success: true,
      data: cards as unknown as IFlashcard[],
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to fetch flashcards' },
      { status: 500 }
    );
  }
}

// POST /api/flashcards - Create a flashcard
export async function POST(req: NextRequest) {
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await req.json();

    if (!body.front || !body.back) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Front and back content are required' },
        { status: 400 }
      );
    }

    const card = await Flashcard.create({
      userId: authUser.userId,
      front: body.front,
      back: body.back,
      sessionId: body.sessionId,
      nextReviewDate: new Date(),
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
    });

    return NextResponse.json<ApiResponse<IFlashcard>>(
      {
        success: true,
        data: card.toObject() as unknown as IFlashcard,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to create flashcard' },
      { status: 400 }
    );
  }
}
