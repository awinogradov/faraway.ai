import { EntityUpdate } from '../../../typings';

import { User, UserDraft, UserDocument } from './User.model';

export async function snapshot(_id: UserDocument) {
  const user = await User.findOne({ _id })
    .populate('journeys')
    .exec();

  if (!user) throw new Error(`Can't find user: ${_id}"`);

  return user;
}

export async function snapshotByOauth(oauth: string) {
  const user = await User.findOne({ oauth })
    .populate('journeys')
    .exec();

  if (!user) throw new Error(`Can't find user: ${oauth}"`);

  return user;
}

export async function snapshotByEmail(email: string) {
  const user = await User.findOne({ email })
    .populate('journeys')
    .exec();

  if (!user) throw new Error(`Can't find user: ${email}"`);

  return user;
}

export async function create(draft: UserDraft): Promise<UserDocument> {
  return new User(draft).save().catch(err => {
    throw new Error(err);
  });
}

export async function update({ entity: user, diff }: EntityUpdate<UserDocument, UserDraft>): Promise<UserDocument> {
  const draft = await User.findOne(user);

  if (!draft) throw new Error(`Can't find user: ${user.id}"`);

  Object.assign(draft, diff);

  return draft.save().catch(err => {
    throw new Error(err);
  });
}

export async function remove(_id: UserDocument) {
  await User.deleteOne({ _id }).catch(err => {
    throw new Error(err);
  });
}

export const userPublicApi = {
  snapshot,
  snapshotByOauth,
  snapshotByEmail,
  create,
  update,
  remove,
};
export type UserPublicApi = typeof userPublicApi;
export type AllowedUserPublicCalls = Array<keyof UserPublicApi>;
export const allowedMethods = Object.keys(userPublicApi) as AllowedUserPublicCalls;
