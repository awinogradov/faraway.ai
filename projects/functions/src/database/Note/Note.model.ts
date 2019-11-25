/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { CollectionDocument } from '../Collection/Collection.model';

export interface NoteDocument extends Document {
  id: string;
  content: string;
  created: string;
  collections: CollectionDocument[];
}

type DraftColumns = 'content';
export type NoteDraft = Pick<NoteDocument, DraftColumns>;

const NoteSchema = new Schema<NoteDocument>({
  id: { type: String, default: v4, unique: true },
  content: { type: String },
  created: { type: String, default: () => String(Date.now()) },
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
});

export class Note extends mongoose.model<NoteDocument>('Note', NoteSchema) {
  constructor(props: NoteDraft) {
    super(props);
  }
}
