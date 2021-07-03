/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';

export interface LocationTypeDocument extends Document {
  _id: LocationTypeDocument;
  kind: 'locationType';
  title: string;
  created: number;
}

type DraftColumns = 'title';
export type LocationTypeDraft = Pick<LocationTypeDocument, DraftColumns>;

const LocationTypeSchema = new Schema<LocationTypeDocument>({
  kind: { type: String, default: () => 'locationType' },
  title: { type: String, required: true },
  created: { type: Number, default: Date.now },
});

export class LocationType extends mongoose.model<LocationTypeDocument>('LocationType', LocationTypeSchema) {
  constructor(props: LocationTypeDraft) {
    super(props);
  }
}
