export interface IMentor {
  _id?: string;
  name: string;
  avatarUrl?: string;
  subject: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  teachingStyle: 'socratic' | 'direct' | 'storyteller' | 'coach';
  voiceId: string;
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
