/* eslint-disable no-underscore-dangle */
import faker from 'faker';

import { JourneyDraft, Journey } from './Journey.model';

interface NonGeneratedColumns {
  createdBy: string;
}

export const journeyDraftCreator = ({ createdBy }: NonGeneratedColumns): Readonly<JourneyDraft> =>
  Object.freeze({
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    createdBy,
    members: [],
    startsAt: Date.now(),
    endsAt: Date.now(),
  });

export function dangerouslyDropAllRecords() {
  return Journey.deleteMany({});
}
