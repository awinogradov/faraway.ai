/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { CollectionDocument } from '../Collection/Collection.model';

export interface UserDocument extends Document {
  id: string;
  email: string;
  oauth: string;
  created: number;
  collections: CollectionDocument[];
}

type DraftColumns = 'email' | 'oauth';
export type UserDraft = Pick<UserDocument, DraftColumns>;

const UserSchema = new Schema<UserDocument>({
  id: { type: String, default: v4, unique: true },
  email: { type: String, required: true, unique: true },
  oauth: { type: String, required: true, unique: true },
  created: { type: Number, default: Date.now },
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
});

export class User extends mongoose.model<UserDocument>('User', UserSchema) {
  constructor(props: UserDraft) {
    super(props);
  }
}
