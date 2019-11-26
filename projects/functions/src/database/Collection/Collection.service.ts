/* eslint-disable no-underscore-dangle */
import { EntityUpdate } from '../../typings';
import { User } from '../User/User.model';
import { Note } from '../Note/Note.model';
import { Attraction } from '../Attraction/Attraction.model';

import { Collection, CollectionDraft } from './Collection.model';

export async function snapshot(collection: Collection): Promise<Collection> {
  return Collection.findOne({ id: collection.id })
    .populate('createdBy')
    .populate('users')
    .populate('notes')
    .populate('attractions')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: CollectionDraft): Promise<Collection> {
  const collection = new Collection(draft);

  await collection.save().catch(err => {
    throw new Error(err);
  });

  if (!collection) throw new Error(`Can't create collection: ${JSON.stringify(draft)}`);

  return snapshot(collection);
}

export async function update({
  entity: collection,
  diff,
}: EntityUpdate<Collection, Omit<CollectionDraft, 'createdBy'>>): Promise<Collection> {
  const draft = await Collection.findOne({ id: collection.id });

  if (!draft) throw new Error(`Can't find collection: ${collection.id}"`);
  // @ts-ignore check for non TS usage
  if (diff.createdBy) throw new Error(`Can't update createdBy field`);

  Object.assign(draft, diff);

  await draft.save().catch(err => {
    throw new Error(err);
  });

  return snapshot(draft);
}

export type CollectionChildren = User | Note | Attraction;
export interface AddToCollectionProps<E> {
  collection: Collection;
  entity: E;
}

function linkUniq<T extends { id: string; _id: CollectionChildren; kind: string }>(
  collectionId: string,
  e: T,
  arr: CollectionChildren[],
) {
  if (!arr.filter(u => u.id === e.id)[0]) {
    arr.push(e._id);
  } else throw new Error(`${e.kind}: ${e.id} already exists in collection: ${collectionId}`);
}

enum kindToField {
  user = 'users',
  note = 'notes',
  attraction = 'attractions',
}

export async function link<E extends CollectionChildren>({
  collection,
  entity,
}: AddToCollectionProps<E>): Promise<Collection> {
  const draft = await snapshot(collection);

  if (!draft) throw new Error(`Can't find collection: ${collection.id}"`);

  if (kindToField[entity.kind]) {
    linkUniq(collection.id, entity, draft[kindToField[entity.kind]]);
  }

  await draft.save().catch(err => {
    throw new Error(err);
  });

  return snapshot(draft);
}

function unlinkUniq<T extends { id: string; kind: string }>(collectionId: string, e: T, arr: CollectionChildren[]) {
  if (!arr.filter(u => u.id === e.id)[0])
    throw new Error(`${e.kind}: ${e.id} doesn't exist in collection: ${collectionId}`);

  return arr.filter(u => u.id !== e.id);
}

export async function unlink<E extends CollectionChildren>({
  collection,
  entity,
}: AddToCollectionProps<E>): Promise<Collection> {
  const draft = await snapshot(collection);

  if (!draft) throw new Error(`Can't find collection: ${collection.id}"`);

  const field = kindToField[entity.kind];
  if (field) {
    // @ts-ignore enum kindToField is the garant
    draft[field] = unlinkUniq(collection.id, entity, draft[field]);
  }

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

export const collectionPublicApi = {
  create,
  snapshot,
  update,
  remove,
  link,
  unlink,
};
export type CollectionPublicApi = typeof collectionPublicApi;
export type AllowedCollectionPublicCalls = Array<keyof CollectionPublicApi>;
export const allowedMethods = Object.keys(collectionPublicApi) as AllowedCollectionPublicCalls;
