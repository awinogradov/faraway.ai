/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { UserDocument } from '../User/User.model';
import { NoteDocument } from '../Note/Note.model';
import { AttractionDocument } from '../Attraction/Attraction.model';

export interface JourneyDocument extends Document {
  id: string;
  title: string;
  description: string;
  created: number;
  startsAt: number;
  endsAt: number;
  createdBy: UserDocument;
  members: UserDocument[];
  notes: NoteDocument[];
  attractions: AttractionDocument[];
}

type DraftColumns = 'title' | 'description' | 'startsAt' | 'endsAt' | 'members';
export type JourneyDraft = Pick<JourneyDocument, DraftColumns> & { createdBy: string };

const JourneySchema = new Schema<JourneyDocument>({
  id: { type: String, default: v4, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  created: { type: Number, default: Date.now },
  startsAt: { type: Number, default: Date.now },
  endsAt: { type: Number, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  attractions: [{ type: Schema.Types.ObjectId, ref: 'Attraction' }],
});

export class Journey extends mongoose.model<JourneyDocument>('Journey', JourneySchema) {
  constructor(props: JourneyDraft) {
    super(props);
  }
}
