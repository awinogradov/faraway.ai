/* eslint-disable no-useless-constructor */
import mongoose, { Schema, Document } from 'mongoose';

export interface LocationDocument extends Document {
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
}

type DraftColumns = 'id' | 'address' | 'lat' | 'lng' | 'title';
export type LocationDraft = Pick<LocationDocument, DraftColumns>;
export type LocationQuery = Partial<LocationDraft>;

const LocationSchema = new Schema<LocationDocument>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  created: { type: Number, default: () => Date.now() },
});

export class Location extends mongoose.model<LocationDocument>('Location', LocationSchema) {
  constructor(props: LocationDraft) {
    super(props);
  }
}
