import { EntityUpdate } from '../../../typings';

import { User, UserDraft } from './User.model';

export async function snapshot(user: User): Promise<User> {
  // @ts-ignore
  return User.findOne(user)
    .populate('journeys')
    .exec();
}

export async function create(draft: UserDraft): Promise<User> {
  const user = new User(draft);

  await user.save().catch(err => {
    throw new Error(err);
  });

  if (!user) throw new Error(`Can't create user: ${JSON.stringify(draft)}`);

  return snapshot(user);
}

export async function update({ entity: user, diff }: EntityUpdate<User, UserDraft>): Promise<User> {
  const draft = await User.findOne(user);

  if (!draft) throw new Error(`Can't find user: ${user.id}"`);

  Object.assign(draft, diff);

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

export const userPublicApi = {
  create,
  snapshot,
  update,
  remove,
};
export type UserPublicApi = typeof userPublicApi;
export type AllowedUserPublicCalls = Array<keyof UserPublicApi>;
export const allowedMethods = Object.keys(userPublicApi) as AllowedUserPublicCalls;
