/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';

import { JourneyDocument } from '../Journey/Journey.model';
import { LocationTypeDocument } from '../LocationType/LocationType.model';

export interface LocationDocument extends Document {
  kind: 'location';

  /** Google Maps id */
  id: string;
  /** Google Maps location title */
  title: string;
  /** Google Maps formatted address */
  address: string;
  /** Google Maps location lat */
  lat: number;
  /** Google Maps location lng */
  lng: number;
  /** Date when cached */
  created: number;

  type: LocationTypeDocument;
  journeys: JourneyDocument[];
}

type DraftColumns = 'id' | 'address' | 'lat' | 'lng' | 'title' | 'type';
export type LocationDraft = Pick<LocationDocument, DraftColumns>;
export type LocationQuery = Partial<LocationDraft>;

const LocationSchema = new Schema<LocationDocument>({
  kind: { type: String, default: () => 'location' },
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  created: { type: Number, default: Date.now },

  type: { type: Schema.Types.ObjectId, required: true, ref: 'LocationType' },
  journeys: [{ type: Schema.Types.ObjectId, ref: 'Journey' }],
});

export class Location extends mongoose.model<LocationDocument>('Location', LocationSchema) {
  constructor(props: LocationDraft) {
    super(props);
  }
}
