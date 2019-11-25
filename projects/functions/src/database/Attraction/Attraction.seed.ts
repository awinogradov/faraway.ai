/* eslint-disable no-underscore-dangle */
import faker from 'faker';

import { AttractionDraft } from './Attraction.model';

interface NonGeneratedColumns {
  createdBy: AttractionDraft['createdBy'];
  location: AttractionDraft['location'];
}

export const attractionDraftCreator = ({ createdBy, location }: NonGeneratedColumns): Readonly<AttractionDraft> =>
  Object.freeze({
    title: faker.lorem.words(3),
    createdBy: createdBy._id,
    location: location._id,
  });
