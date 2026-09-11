import mongoose, { Schema, Document, Model } from 'mongoose';
import { IMentor } from '@atlas/types';

export interface MentorDocument extends Omit<IMentor, '_id'>, Document {}

const MentorSchema = new Schema<MentorDocument>(
  {
    name: { type: String, required: true },
    avatarUrl: { type: String },
    subject: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    teachingStyle: {
      type: String,
      enum: ['socratic', 'direct', 'storyteller', 'coach'],
      default: 'socratic',
    },
    voiceId: { type: String, required: true },
    vapiAssistantId: { type: String },
    systemPrompt: { type: String },
  },
  { timestamps: true }
);

export const Mentor: Model<MentorDocument> =
  mongoose.models.Mentor || mongoose.model<MentorDocument>('Mentor', MentorSchema);
