/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { UserDocument } from '../User/User.model';
import { NoteDocument } from '../Note/Note.model';

export interface CollectionDocument extends Document {
  id: string;
  title: string;
  created: number;
  createdBy: UserDocument;
  sharedWith: UserDocument[];
  notes: NoteDocument[];
}

type DraftColumns = 'title' | 'createdBy';
export type CollectionDraft = Pick<CollectionDocument, DraftColumns>;

const CollectionSchema = new Schema<CollectionDocument>({
  id: { type: String, default: v4, unique: true },
  title: { type: String, required: true },
  created: { type: Number, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

export class Collection extends mongoose.model<CollectionDocument>('Collection', CollectionSchema) {
  constructor(props: CollectionDraft) {
    super(props);
  }
}
