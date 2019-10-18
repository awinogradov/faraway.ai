export type Timing = number[];

export interface UserNote {
  timestamp: number;
  content: string;
}

export interface CardBase {
  kind: string;
  notes?: Array<UserNote>;
  timestamp?: number;
}

export interface FligntDirection {
  airport: string;
  terminal: string;
  timestamp: number;
}

export interface CardFlighData extends CardBase {
  kind: 'flight';
  company: string;
  booking?: string;
  number: string;
  origin: FligntDirection;
  destination: FligntDirection;
}

export type AccommodationType = 'hotel' | 'apartments' | 'hostel';
export type AccommodationProvider = 'booking' | 'airbnb';

export interface CardAccomodationData extends CardBase {
  kind: 'accommodation';
  title: string;
  type: AccommodationType;
  transfer?: boolean;
  provider: AccommodationProvider;
  'check-in'?: Timing;
  'check-out'?: Timing;
}

export type PointType = 'attraction' | 'sight';

export interface CardPointData extends CardBase {
  kind: 'userPlace';
  title: string;
  type: AccommodationType;
  transfer?: boolean;
  hours?: Timing;
}

export interface CardInstaPointData extends CardBase {
  kind: 'instaPlace';
  title: string;
  type: AccommodationType;
  transfer?: boolean;
  hours?: Timing;
  post?: {
    image?: string;
    ref?: string;
    likes?: number;
  };
  author?: {
    username: string;
    avatar: string;
    ref: string;
  };
  location?: {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    googleMapsUrl: string;
    ref: string;
  };
}

export interface TravelPlanData {
  cards: Array<CardFlighData | CardAccomodationData | CardPointData | CardInstaPointData>;
  days: number[];
}
