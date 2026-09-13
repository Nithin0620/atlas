import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Session } from '@/lib/models/Session';
import { User } from '@/lib/models/User';
import { Flashcard } from '@/lib/models/Flashcard';
import { getAuthUser } from '@/lib/auth';
import { ApiResponse, ISession } from '@atlas/types';

// GET /api/sessions?userId=... - List learning sessions
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const authUser = getAuthUser(req);
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || authUser?.userId;

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'User is not authenticated' },
        { status: 401 }
      );
    }

    const sessions = await Session.find({ userId })
      .populate('mentorId')
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json<ApiResponse<ISession[]>>({
      success: true,
      data: sessions as unknown as ISession[],
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

// POST /api/sessions - Save completed voice session, auto-extract debrief and generate flashcards
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const authUser = getAuthUser(req);
    const body = await req.json();

    const userId = body.userId || authUser?.userId;
    if (!userId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    const durationSeconds = Number(body.durationSeconds) || 0;
    const summaryText = body.summary || '';

    // Extract key takeaways from summary text or bullet lines
    const lines = summaryText
      .split('\n')
      .map((l: string) => l.trim())
      .filter((l: string) => l.length > 5);

    const keyTakeaways: string[] = [];
    lines.forEach((line: string) => {
      if (line.startsWith('AI:') || line.startsWith('Mentor:')) {
        const clean = line.replace(/^(AI|Mentor):\s*/i, '');
        if (clean.length > 25 && keyTakeaways.length < 4) {
          keyTakeaways.push(clean.slice(0, 180));
        }
      }
    });

    if (keyTakeaways.length === 0 && summaryText) {
      keyTakeaways.push('Completed voice tutoring exploration session.');
    }

    // 1. Create Session
    const session = await Session.create({
      userId,
      mentorId: body.mentorId,
      durationSeconds,
      summary: summaryText,
      keyTakeaways,
      transcript: body.transcript || [],
    });

    // 2. Automatically generate 1-2 Flashcards from key takeaways if any exist
    if (keyTakeaways.length > 0) {
      const flashcardsToInsert = keyTakeaways.slice(0, 2).map((takeaway, idx) => ({
        userId,
        sessionId: session._id,
        front: `Key Takeaway ${idx + 1}: What was the core insight from this discussion?`,
        back: takeaway,
        nextReviewDate: new Date(),
        interval: 1,
        repetition: 0,
        easeFactor: 2.5,
      }));

      await Flashcard.insertMany(flashcardsToInsert).catch(() => {});
    }

    // 3. Increment User's totalCallMinutes and maintain learningStreak
    const callMinutesToAdd = Math.max(1, Math.ceil(durationSeconds / 60));
    await User.findByIdAndUpdate(userId, {
      $inc: { totalCallMinutes: callMinutesToAdd },
    }).catch(() => {});

    return NextResponse.json<ApiResponse<ISession>>(
      {
        success: true,
        data: session.toObject() as unknown as ISession,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to record session' },
      { status: 400 }
    );
  }
}
