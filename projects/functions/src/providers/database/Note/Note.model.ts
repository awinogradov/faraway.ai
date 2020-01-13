/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { UserDocument } from '../User/User.model';
import { JourneyDocument } from '../Journey/Journey.model';

export interface NoteDocument extends Document {
  kind: 'note';
  id: string;
  content: string;
  created: number;
  createdBy: UserDocument;
  journeys: JourneyDocument[];
}

type DraftColumns = 'content' | 'createdBy';
export type NoteDraft = Pick<NoteDocument, DraftColumns>;

const NoteSchema = new Schema<NoteDocument>({
  kind: { type: String, default: () => 'note' },
  id: { type: String, default: v4, unique: true },
  content: { type: String },
  created: { type: Number, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  journeys: [{ type: Schema.Types.ObjectId, ref: 'Journey' }],
});

export class Note extends mongoose.model<NoteDocument>('Note', NoteSchema) {
  constructor(props: NoteDraft) {
    super(props);
  }
}
