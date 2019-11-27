import faker from 'faker';

import { LocationDraft, Location } from './Location.model';

export const locationDraftCreator = (): Readonly<LocationDraft> =>
  Object.freeze({
    id: `fakeGooglePlaceId-${faker.random.uuid()}`,
    title: faker.company.companyName(),
    address: faker.address.streetAddress(),
    lat: Number(faker.address.latitude()),
    lng: Number(faker.address.longitude()),
  });

export function dangerouslyDropAllRecords() {
  return Location.deleteMany({});
}
