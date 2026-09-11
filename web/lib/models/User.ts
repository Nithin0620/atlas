import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from '@atlas/types';

export interface UserDocument extends Omit<IUser, '_id'>, Document {
  passwordHash: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String },
    learningStreak: { type: Number, default: 1 },
    totalCallMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
