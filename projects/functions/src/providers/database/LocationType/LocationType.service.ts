import { EntityUpdate } from '../../../typings';

import { LocationType, LocationTypeDraft } from './LocationType.model';

export async function snapshot(note: LocationType): Promise<LocationType> {
  return LocationType.findOne(note)
    .populate('locations')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: LocationTypeDraft): Promise<LocationType> {
  const note = new LocationType(draft);

  await note.save().catch(err => {
    throw new Error(err);
  });

  if (!note) throw new Error(`Can't create location type: ${JSON.stringify(draft)}`);

  return snapshot(note);
}

export async function update({
  entity: locationKind,
  diff,
}: EntityUpdate<LocationType, LocationType>): Promise<LocationType> {
  const draft = await LocationType.findOne(locationKind);

  if (!draft) throw new Error(`Can't find location type: ${locationKind.id}`);

  Object.assign(draft, diff);

  await draft.save().catch(err => {
    throw new Error(err);
  });

  return snapshot(draft);
}

export async function remove(draft: LocationTypeDraft) {
  await LocationType.deleteOne(draft).catch(err => {
    throw new Error(err);
  });
}

export async function all() {
  return LocationType.find({}).catch(err => {
    throw new Error(err);
  });
}

export function dangerouslyDropAllRecords() {
  return LocationType.deleteMany({});
}

export const notePublicApi = {
  create,
  snapshot,
  update,
  remove,
  all,
};
export type LocationTypePublicApi = typeof notePublicApi;
export type AllowedLocationTypePublicCalls = Array<keyof LocationTypePublicApi>;
export const allowedMethods = Object.keys(notePublicApi) as AllowedLocationTypePublicCalls;
