import faker from 'faker';

import { NoteDraft } from './Note.model';

interface NonGeneratedColumns {
  createdBy: NoteDraft['createdBy'];
}

export const noteDraftCreator = ({ createdBy }: NonGeneratedColumns): Readonly<NoteDraft> =>
  Object.freeze({
    content: faker.lorem.paragraphs(2),
    createdBy,
  });
