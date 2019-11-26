import faker from 'faker';

import { UserDraft, User } from './User.model';

export const userDraftCreator = (): Readonly<UserDraft> =>
  Object.freeze({
    email: faker.internet.email(),
    oauth: faker.random.uuid(),
  });

export function dangerouslyDropAllRecords() {
  return User.deleteMany({});
}
