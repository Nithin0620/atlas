import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Mentor } from '@/lib/models/Mentor';
import { createVapiAssistant } from '@/lib/vapi';
import { ApiResponse, IMentor } from '@atlas/types';

// GET /api/mentors - List all mentors or filter by subject
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get('subject');

    const filter = subject && subject !== 'all' ? { subject } : {};
    const mentors = await Mentor.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json<ApiResponse<IMentor[]>>({
      success: true,
      data: mentors as unknown as IMentor[],
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to fetch mentors' },
      { status: 500 }
    );
  }
}

// POST /api/mentors - Create a new custom AI mentor
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const vapiAssistantId = await createVapiAssistant(body);

    const newMentor = await Mentor.create({ ...body, vapiAssistantId });

    return NextResponse.json<ApiResponse<IMentor>>(
      {
        success: true,
        data: newMentor.toObject() as unknown as IMentor,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to create mentor' },
      { status: 400 }
    );
  }
}
