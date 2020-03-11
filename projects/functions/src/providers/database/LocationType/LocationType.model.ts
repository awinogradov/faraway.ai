/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';

import { LocationDocument } from '../Location/Location.model';

export interface LocationTypeDocument extends Document {
  kind: 'locationType';
  id: string;
  title: string;
  created: number;
  locations: LocationDocument[];
}

type DraftColumns = 'title';
export type LocationTypeDraft = Pick<LocationTypeDocument, DraftColumns>;

const LocationTypeSchema = new Schema<LocationTypeDocument>({
  kind: { type: String, default: () => 'locationType' },
  id: { type: String, default: v4, unique: true },
  title: { type: String },
  created: { type: Number, default: Date.now },
  locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
});

export class LocationType extends mongoose.model<LocationTypeDocument>('LocationType', LocationTypeSchema) {
  constructor(props: LocationTypeDraft) {
    super(props);
  }
}
