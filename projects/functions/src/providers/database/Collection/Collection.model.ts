/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { UserDocument } from '../User/User.model';
import { NoteDocument } from '../Note/Note.model';
import { AttractionDocument } from '../Attraction/Attraction.model';

export interface CollectionDocument extends Document {
  id: string;
  title: string;
  created: number;
  createdBy: UserDocument;
  users: UserDocument[];
  notes: NoteDocument[];
  attractions: AttractionDocument[];
}

type DraftColumns = 'title' | 'createdBy';
export type CollectionDraft = Pick<CollectionDocument, DraftColumns>;

const CollectionSchema = new Schema<CollectionDocument>({
  id: { type: String, default: v4, unique: true },
  title: { type: String, required: true },
  created: { type: Number, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  attractions: [{ type: Schema.Types.ObjectId, ref: 'Attraction' }],
});

export class Collection extends mongoose.model<CollectionDocument>('Collection', CollectionSchema) {
  constructor(props: CollectionDraft) {
    super(props);
  }
}
