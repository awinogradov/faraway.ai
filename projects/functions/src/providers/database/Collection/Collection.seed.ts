/* eslint-disable no-underscore-dangle */
import faker from 'faker';

import { CollectionDraft, Collection } from './Collection.model';

interface NonGeneratedColumns {
  createdBy: CollectionDraft['createdBy'];
}

export const collectionDraftCreator = ({ createdBy }: NonGeneratedColumns): Readonly<CollectionDraft> =>
  Object.freeze({
    title: faker.lorem.words(3),
    createdBy: createdBy._id,
  });

export function dangerouslyDropAllRecords() {
  return Collection.deleteMany({});
}
