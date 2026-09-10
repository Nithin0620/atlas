import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Session } from '@/lib/models/Session';
import { ApiResponse, ISession } from '@atlas/types';

// GET /api/sessions?userId=... - List learning sessions
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    const sessions = await Session.find({ userId })
      .populate('mentorId')
      .sort({ createdAt: -1 })
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

// POST /api/sessions - Save completed voice session and debrief summary
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const session = await Session.create(body);

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
