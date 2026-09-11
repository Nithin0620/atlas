import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { User } from '@/lib/models/User';
import { Mentor } from '@/lib/models/Mentor';
import { Session } from '@/lib/models/Session';
import { Flashcard } from '@/lib/models/Flashcard';
import { seedInitialMentorsIfEmpty } from '@/lib/db/seed';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthUser(req);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    await seedInitialMentorsIfEmpty();

    const user = await User.findById(auth.userId).select('-passwordHash');

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch live mentors from MongoDB Atlas
    const mentors = await Mentor.find({}).sort({ createdAt: 1 }).lean();

    // Fetch user's actual voice sessions from MongoDB Atlas
    const sessions = await Session.find({ userId: auth.userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Fetch user's actual flashcards from MongoDB Atlas
    const flashcards = await Flashcard.find({ userId: auth.userId })
      .sort({ nextReviewDate: 1 })
      .lean();

    // Calculate dynamic analytics from real session data
    const totalSessionSeconds = sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    const totalCallMinutes = Math.round(totalSessionSeconds / 60) || user.totalCallMinutes || 0;

    // Count unique concepts mastered from session key takeaways
    const allConcepts = new Set<string>();
    sessions.forEach((s) => {
      if (Array.isArray(s.keyTakeaways)) {
        s.keyTakeaways.forEach((k) => allConcepts.add(k));
      }
    });
    const conceptsMastered = allConcepts.size;

    // Calculate real flashcard retention rate
    let retentionRate = 0;
    if (flashcards.length > 0) {
      const reviewed = flashcards.filter((f) => (f.repetition || 0) > 0).length;
      retentionRate = Math.round((reviewed / flashcards.length) * 100);
    }

    const stats = {
      totalCallMinutes,
      conceptsMastered,
      retentionRate,
      learningStreak: user.learningStreak || 1,
    };

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        learningStreak: user.learningStreak || 1,
        totalCallMinutes,
      },
      stats,
      mentors: mentors.map((m: any) => ({
        _id: m._id.toString(),
        name: m.name,
        subject: m.subject,
        topic: m.topic,
        difficulty: m.difficulty,
        teachingStyle: m.teachingStyle,
        voiceId: m.voiceId,
        avatarUrl: m.avatarUrl || '🧑‍🏫',
      })),
      recentSessions: sessions.map((s: any) => ({
        _id: s._id.toString(),
        userId: s.userId,
        mentorId: s.mentorId?.toString(),
        durationSeconds: s.durationSeconds || 0,
        summary: s.summary,
        transcript: s.transcript,
        keyTakeaways: s.keyTakeaways || [],
        createdAt: s.createdAt,
      })),
      flashcards: flashcards.map((f: any) => ({
        id: f._id.toString(),
        front: f.front,
        back: f.back,
        nextReviewDate: f.nextReviewDate,
        interval: f.interval,
        repetition: f.repetition,
      })),
    });
  } catch (error: any) {
    console.error('Dashboard live stats error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
