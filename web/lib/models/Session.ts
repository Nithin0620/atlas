import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { ISession } from '@atlas/types';

export interface SessionDocument extends Omit<ISession, '_id' | 'mentorId'>, Document {
  mentorId: Types.ObjectId | string;
}

const SessionSchema = new Schema<SessionDocument>(
  {
    userId: { type: String, required: true, index: true },
    mentorId: { type: Schema.Types.ObjectId, ref: 'Mentor', required: true },
    durationSeconds: { type: Number, default: 0 },
    summary: { type: String },
    transcript: [
      {
        role: { type: String, enum: ['assistant', 'user'] },
        content: { type: String },
        timestamp: { type: String },
      },
    ],
    keyTakeaways: [{ type: String }],
  },
  { timestamps: true }
);

export const Session: Model<SessionDocument> =
  mongoose.models.Session || mongoose.model<SessionDocument>('Session', SessionSchema);
