/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';

import { UserDocument } from '../User/User.model';
import { NoteDocument } from '../Note/Note.model';
import { LocationDocument } from '../Location/Location.model';

export interface JourneyDocument extends Document {
  _id: JourneyDocument;
  title: string;
  description: string;
  created: number;
  startsAt: number;
  endsAt: number;
  createdBy: UserDocument;
  members: UserDocument[];
  notes: NoteDocument[];
  locations: LocationDocument[];
}

type DraftColumns = 'title' | 'description' | 'startsAt' | 'endsAt' | 'members' | 'locations' | 'createdBy';
export type JourneyDraft = Pick<JourneyDocument, DraftColumns>;

const JourneySchema = new Schema<JourneyDocument>({
  title: { type: String, required: true },
  description: { type: String },
  created: { type: Number, default: Date.now },
  startsAt: { type: Number, default: Date.now },
  endsAt: { type: Number, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
});

export class Journey extends mongoose.model<JourneyDocument>('Journey', JourneySchema) {
  constructor(props: JourneyDraft) {
    super(props);
  }
}
