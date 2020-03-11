import { LocationTypeDraft, LocationType } from './LocationType.model';

export const locationTypeDraftCreator = (): Readonly<LocationTypeDraft> =>
  Object.freeze({
    title: 'attraction',
  });

export function dangerouslyDropAllRecords() {
  return LocationType.deleteMany({});
}
