export interface CreateJourney {
  title: string;
  createdBy: string;
  startsAt?: number;
  endsAt?: number;
  members?: string[];
}
