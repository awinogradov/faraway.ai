/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { JourneyDocument } from '../Journey/Journey.model';

export interface UserDocument extends Document {
  kind: 'user';
  id: string;
  email: string;
  oauth: string;
  created: number;
  journeys: JourneyDocument[];
}

type DraftColumns = 'email' | 'oauth';
export type UserDraft = Pick<UserDocument, DraftColumns>;

const UserSchema = new Schema<UserDocument>({
  kind: { type: String, default: () => 'user' },
  id: { type: String, default: v4, unique: true },
  email: { type: String, required: true, unique: true },
  oauth: { type: String, required: true, unique: true },
  created: { type: Number, default: Date.now },
  journeys: [{ type: Schema.Types.ObjectId, ref: 'Journey' }],
});

export class User extends mongoose.model<UserDocument>('User', UserSchema) {
  constructor(props: UserDraft) {
    super(props);
  }
}
