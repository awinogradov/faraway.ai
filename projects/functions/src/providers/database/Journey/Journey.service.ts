/* eslint-disable no-underscore-dangle */
import { EntityUpdate } from '../../../typings';
import { User } from '../User/User.model';
import { Note } from '../Note/Note.model';
import { Location } from '../Location/Location.model';
import * as userService from '../User/User.service';

import { Journey, JourneyDraft, JourneyDocument } from './Journey.model';

export async function snapshot(journey: JourneyDocument): Promise<Journey> {
  return Journey.findOne({ _id: journey })
    .populate('createdBy')
    .populate('members')
    .populate('notes')
    .populate('locations')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: JourneyDraft): Promise<JourneyDocument> {
  const user = await userService.snapshot(draft.createdBy);

  if (!user) throw new Error(`Can't find user: ${draft.createdBy}`);

  const journey = new Journey({
    ...draft,
    createdBy: user,
  });

  await journey.save().catch((err: string) => {
    throw new Error(err);
  });

  if (!journey) throw new Error(`Can't create journey: ${JSON.stringify(draft)}`);

  await user.journeys.push(journey);
  await user.save();

  return journey;
}

export async function update({
  entity: journey,
  diff,
}: EntityUpdate<JourneyDocument, Omit<JourneyDraft, 'createdBy'>>): Promise<JourneyDocument> {
  const draft = await Journey.findOne({ _id: journey });

  if (!draft) throw new Error(`Can't find journey: ${journey}"`);
  // @ts-ignore check for non TS usage
  if (diff.createdBy) throw new Error(`Can't update createdBy field`);

  Object.assign(draft, diff);

  return draft.save().catch(err => {
    throw new Error(err);
  });
}

export type JourneyChildren = User | Note | Location;
export interface AddToJourneyProps<E> {
  journey: Journey;
  entity: E;
}

function linkUniq<T extends { id: string; _id: JourneyChildren; kind: string }>(
  journeyId: string,
  e: T,
  arr: JourneyChildren[],
) {
  if (!arr.filter(u => u.id === e.id)[0]) {
    arr.push(e._id);
  } else throw new Error(`${e.kind}: ${e.id} already exists in journey: ${journeyId}`);
}

enum kindToField {
  user = 'members',
  note = 'notes',
  location = 'locations',
}

export async function link<E extends JourneyChildren>({ journey, entity }: AddToJourneyProps<E>): Promise<Journey> {
  const draft = await snapshot(journey);

  if (kindToField[entity.kind]) {
    // @ts-ignore kindToField is the garant
    linkUniq(journey.id, entity, draft[kindToField[entity.kind]]);
  }

  await draft.save().catch(err => {
    throw new Error(err);
  });

  return snapshot(draft);
}

function unlinkUniq<T extends { id: string; kind: string }>(journeyId: string, e: T, arr: JourneyChildren[]) {
  if (!arr.filter(u => u.id === e.id)[0]) throw new Error(`${e.kind}: ${e.id} doesn't exist in journey: ${journeyId}`);

  return arr.filter(u => u.id !== e.id);
}

export async function unlink<E extends JourneyChildren>({ journey, entity }: AddToJourneyProps<E>): Promise<Journey> {
  const draft = await snapshot(journey);

  if (!draft) throw new Error(`Can't find journey: ${journey.id}"`);

  const field = kindToField[entity.kind];
  if (field) {
    // @ts-ignore enum kindToField is the garant
    draft[field] = unlinkUniq(journey.id, entity, draft[field]);
  }

  await draft.save().catch(err => {
    throw new Error(err);
  });

  return snapshot(draft);
}

export async function remove(draft: Omit<JourneyDraft, 'createdBy'>) {
  await Journey.deleteOne(draft).catch(err => {
    throw new Error(err);
  });
}

export const journeyPublicApi = {
  create,
  snapshot,
  update,
  remove,
  link,
  unlink,
};
export type JourneyPublicApi = typeof journeyPublicApi;
export type AllowedJourneyPublicCalls = Array<keyof JourneyPublicApi>;
export const allowedMethods = Object.keys(journeyPublicApi) as AllowedJourneyPublicCalls;
