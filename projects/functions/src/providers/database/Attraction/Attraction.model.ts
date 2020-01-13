/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { UserDocument } from '../User/User.model';
import { LocationDocument } from '../Location/Location.model';
import { JourneyDocument } from '../Journey/Journey.model';

export interface AttractionDocument extends Document {
  kind: 'attraction';
  id: string;
  title: string;
  created: number;
  createdBy: UserDocument;
  location: LocationDocument;
  journeys: JourneyDocument[];
}

type DraftColumns = 'title' | 'createdBy' | 'location';
export type AttractionDraft = Pick<AttractionDocument, DraftColumns>;

const AttractionSchema = new Schema<AttractionDocument>({
  kind: { type: String, default: () => 'attraction' },
  id: { type: String, default: v4, unique: true },
  title: { type: String, required: true },
  created: { type: Number, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  location: { type: Schema.Types.ObjectId, required: true, ref: 'Location' },
  journeys: [{ type: Schema.Types.ObjectId, ref: 'Journey' }],
});

export class Attraction extends mongoose.model<AttractionDocument>('Attraction', AttractionSchema) {
  constructor(props: AttractionDraft) {
    super(props);
  }
}
