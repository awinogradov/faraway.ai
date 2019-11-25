import { EntityUpdate } from '../../typings';

import { User, UserDraft } from './User.model';

export async function snapshot(user: User): Promise<User> {
  return User.findOne(user)
    .populate('collections')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: UserDraft): Promise<User> {
  const user = new User(draft);

  await user.save().catch(err => {
    throw new Error(err);
  });

  if (!user) {
    throw new Error(`Can't create user: ${JSON.stringify(draft)}`);
  }

  return snapshot(user);
}

export async function update({ entity: user, diff }: EntityUpdate<User, UserDraft>): Promise<User> {
  const draft = await User.findOne(user);

  if (!draft) {
    throw new Error(`Can't find user "${JSON.stringify(user)}"`);
  }

  Object.keys(diff).forEach(field => {
    // @ts-ignore
    draft[field] = diff[field];
  });

  await draft.save().catch(err => {
    throw new Error(err);
  });

  return snapshot(draft);
}

export async function remove(draft: UserDraft) {
  await User.deleteOne(draft).catch(err => {
    throw new Error(err);
  });
}

export function dangerouslyDropAllRecords() {
  return User.deleteMany({});
}

export const userPublicApi = {
  create: true,
  snapshot: true,
  update: true,
  remove: true,
};
export type UserPublicApi = typeof userPublicApi;
export type AllowedUserPublicCalls = Array<keyof UserPublicApi>;
export const allowedMethods = Object.keys(userPublicApi) as AllowedUserPublicCalls;
