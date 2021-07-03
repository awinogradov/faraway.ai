/* eslint-disable no-underscore-dangle */
import faker from 'faker';

import { UserDocument } from '../User/User.model';

import { JourneyDraft, Journey } from './Journey.model';

interface NonGeneratedColumns {
  createdBy: UserDocument;
}

export const journeyDraftCreator = ({ createdBy }: NonGeneratedColumns): Readonly<JourneyDraft> =>
  Object.freeze({
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    createdBy,
    members: [],
    startsAt: Date.now(),
    endsAt: Date.now(),
    locations: [],
  });

export function dangerouslyDropAllRecords() {
  return Journey.deleteMany({});
}
