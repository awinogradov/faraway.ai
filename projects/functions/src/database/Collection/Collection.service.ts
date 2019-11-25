/* eslint-disable no-underscore-dangle */
import { EntityUpdate } from '../../typings';
import { User } from '../User/User.model';

import { Collection, CollectionDraft } from './Collection.model';

export async function snapshot(collection: Collection): Promise<Collection> {
  return Collection.findOne(collection)
    .populate('createdBy')
    .populate('sharedWith')
    .populate('notes')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: CollectionDraft): Promise<Collection> {
  const collection = new Collection(draft);

  await collection.save().catch(err => {
    throw new Error(err);
  });

  if (!collection) {
    throw new Error(`Can't create collection: ${JSON.stringify(draft)}`);
  }

  return snapshot(collection);
}

export async function update({
  entity: collection,
  diff,
}: EntityUpdate<Collection, Omit<CollectionDraft, 'createdBy'>>): Promise<Collection> {
  const draft = await Collection.findOne(collection);

  if (!draft) {
    throw new Error(`Can't find collection "${JSON.stringify(collection)}"`);
  }

  // @ts-ignore check for non TS usage
  if (diff.createdBy) {
    throw new Error(`Can't update createdBy field`);
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

export async function share({ collection, user }: { collection: Collection; user: User }): Promise<Collection> {
  const draft = await Collection.findOne(collection);

  if (!draft) {
    throw new Error(`Can't find collection "${JSON.stringify(collection)}"`);
  }

  draft.sharedWith.push(user._id);

  await draft.save().catch(err => {
    throw new Error(err);
  });

  return snapshot(draft);
}

export async function remove(draft: CollectionDraft) {
  await Collection.deleteOne(draft).catch(err => {
    throw new Error(err);
  });
}

export function dangerouslyDropAllRecords() {
  return Collection.deleteMany({});
}

export const collectionPublicApi = {
  create: true,
  snapshot: true,
  update: true,
  remove: true,
  share: true,
};
export type CollectionPublicApi = typeof collectionPublicApi;
export type AllowedCollectionPublicCalls = Array<keyof CollectionPublicApi>;
export const allowedMethods = Object.keys(collectionPublicApi) as AllowedCollectionPublicCalls;
