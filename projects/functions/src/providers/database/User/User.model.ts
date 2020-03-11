/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';

import { JourneyDocument } from '../Journey/Journey.model';

export interface UserDocument extends Document {
  _id: UserDocument;
  kind: 'user';

  email: string;
  oauth: string;
  created: number;
  journeys: JourneyDocument[];
}

type DraftColumns = 'email' | 'oauth';
export type UserDraft = Pick<UserDocument, DraftColumns>;

const UserSchema = new Schema<UserDocument>({
  kind: { type: String, default: () => 'user' },
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
