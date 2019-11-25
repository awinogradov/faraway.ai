import faker from 'faker';

import { UserDraft } from './User.model';

export const userDraftCreator = (): Readonly<UserDraft> =>
  Object.freeze({
    email: faker.internet.email(),
    oauth: faker.random.uuid(),
  });
