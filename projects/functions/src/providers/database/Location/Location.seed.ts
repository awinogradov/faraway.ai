import faker from 'faker';

import { LocationDraft, Location } from './Location.model';

interface NonGeneratedColumns {
  type: LocationDraft['type'];
}

export const locationDraftCreator = ({ type }: NonGeneratedColumns): Readonly<LocationDraft> =>
  Object.freeze({
    id: `fakeGooglePlaceId-${faker.random.uuid()}`,
    title: faker.company.companyName(),
    address: faker.address.streetAddress(),
    lat: Number(faker.address.latitude()),
    lng: Number(faker.address.longitude()),
    type,
  });

export function dangerouslyDropAllRecords() {
  return Location.deleteMany({});
}
