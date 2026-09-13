import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Flashcard } from '@/lib/models/Flashcard';
import { getAuthUser } from '@/lib/auth';
import { ApiResponse } from '@atlas/types';

interface Params {
  params: Promise<{ id: string }>;
}

// DELETE /api/flashcards/[id]
export async function DELETE(req: NextRequest, { params }: Params) {
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

    const card = await Flashcard.findOneAndDelete({ _id: id, userId: authUser.userId });
    if (!card) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Flashcard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({ success: true, message: 'Flashcard deleted' });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to delete flashcard' },
      { status: 500 }
    );
  }
}
