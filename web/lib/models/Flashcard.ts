import mongoose, { Schema, Document, Model } from 'mongoose';
import { IFlashcard } from '@atlas/types';

export interface FlashcardDocument extends Omit<IFlashcard, '_id'>, Document {}

const FlashcardSchema = new Schema<FlashcardDocument>(
  {
    userId: { type: String, required: true, index: true },
    sessionId: { type: Schema.Types.ObjectId, ref: 'Session' },
    front: { type: String, required: true },
    back: { type: String, required: true },
    nextReviewDate: { type: Date, default: Date.now },
    interval: { type: Number, default: 1 },
    repetition: { type: Number, default: 0 },
    easeFactor: { type: Number, default: 2.5 },
  },
  { timestamps: true }
);

export const Flashcard: Model<FlashcardDocument> =
  mongoose.models.Flashcard || mongoose.model<FlashcardDocument>('Flashcard', FlashcardSchema);
