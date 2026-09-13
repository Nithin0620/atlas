export interface IUser {
  _id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
  learningStreak?: number;
  totalCallMinutes?: number;
  createdAt?: string | Date;
}

export type MentorDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type MentorTeachingStyle = 'socratic' | 'direct' | 'storyteller' | 'coach';
export type MentorPace = 'slow' | 'natural' | 'brisk' | 'fast';
export type MentorDepth = 'overview' | 'deep_dive' | 'exam_drill';

export interface IMentorVoice {
  provider: 'openai' | '11labs' | 'cartesia' | 'vapi' | 'deepgram';
  voiceId: string;
  name: string;
  accent?: string;
  description?: string;
}

export interface IMentor {
  _id?: string;
  name: string;
  avatarUrl?: string;
  subject: string;
  topic: string;
  difficulty: MentorDifficulty;
  teachingStyle: MentorTeachingStyle;
  pace?: MentorPace;
  depth?: MentorDepth;
  voiceProvider?: string;
  voiceId: string;
  voiceName?: string;
  vapiAssistantId?: string;
  systemPrompt?: string;
  createdAt?: string | Date;
}

export interface ISession {
  _id?: string;
  userId: string;
  mentorId: string;
  durationSeconds: number;
  summary?: string;
  transcript?: Array<{ role: 'assistant' | 'user'; content: string; timestamp: string }>;
  keyTakeaways?: string[];
  createdAt?: string | Date;
}

export interface IFlashcard {
  _id?: string;
  userId: string;
  sessionId?: string;
  front: string;
  back: string;
  nextReviewDate?: string | Date;
  interval?: number;
  repetition?: number;
  easeFactor?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
