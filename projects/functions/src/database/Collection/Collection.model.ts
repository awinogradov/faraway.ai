/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { UserDocument } from '../User/User.model';

export interface CollectionDocument extends Document {
  id: string;
  title: string;
  created: string;
  createdBy: UserDocument['_id'];
  sharedWith: UserDocument[];
}

type NonDraftColumns = 'title' | 'createdBy';
export type CollectionDraft = Pick<CollectionDocument, NonDraftColumns>;

const CollectionSchema = new Schema<CollectionDocument>({
  id: { type: String, default: v4, unique: true },
  title: { type: String, required: true },
  created: { type: String, default: () => String(Date.now()) },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export class Collection extends mongoose.model<CollectionDocument>('Collection', CollectionSchema) {
  constructor(props: CollectionDraft) {
    super(props);
  }
}
