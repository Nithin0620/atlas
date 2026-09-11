import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Mentor } from '@/lib/models/Mentor';
import { updateVapiAssistant, deleteVapiAssistant } from '@/lib/vapi';
import { getAuthUser } from '@/lib/auth';
import { ApiResponse, IMentor } from '@atlas/types';

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/mentors/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const mentor = await Mentor.findById(id).lean();

    if (!mentor) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Mentor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<IMentor>>({
      success: true,
      data: mentor as unknown as IMentor,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to fetch mentor' },
      { status: 500 }
    );
  }
}

// PUT /api/mentors/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    if (!getAuthUser(req)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const mentor = await Mentor.findById(id);
    if (!mentor) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Mentor not found' },
        { status: 404 }
      );
    }

    if (mentor.vapiAssistantId) {
      await updateVapiAssistant(mentor.vapiAssistantId, body);
    }

    Object.assign(mentor, body);
    await mentor.save();

    return NextResponse.json<ApiResponse<IMentor>>({
      success: true,
      data: mentor.toObject() as unknown as IMentor,
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to update mentor' },
      { status: 400 }
    );
  }
}

// DELETE /api/mentors/[id]
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    if (!getAuthUser(req)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const { id } = await params;

    const mentor = await Mentor.findById(id);
    if (!mentor) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Mentor not found' },
        { status: 404 }
      );
    }

    if (mentor.vapiAssistantId) {
      await deleteVapiAssistant(mentor.vapiAssistantId);
    }

    await mentor.deleteOne();

    return NextResponse.json<ApiResponse>({ success: true });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to delete mentor' },
      { status: 400 }
    );
  }
}