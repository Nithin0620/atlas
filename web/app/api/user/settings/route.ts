import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';
import { ApiResponse } from '@atlas/types';

// GET /api/user/settings
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
    const user = await User.findById(authUser.userId).select('-passwordHash').lean();
    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        learningStreak: user.learningStreak || 1,
        totalCallMinutes: user.totalCallMinutes || 0,
      },
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to fetch user settings' },
      { status: 500 }
    );
  }
}

// PUT /api/user/settings - Update profile settings
export async function PUT(req: NextRequest) {
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

    const updatedUser = await User.findByIdAndUpdate(
      authUser.userId,
      {
        $set: {
          name: body.name,
        },
      },
      { new: true }
    ).select('-passwordHash');

    return NextResponse.json<ApiResponse>({
      success: true,
      data: updatedUser,
      message: 'Settings updated successfully.',
    });
  } catch (error: any) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: error.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}
