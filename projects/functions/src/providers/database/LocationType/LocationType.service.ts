import { EntityUpdate } from '../../../typings';

import { LocationType, LocationTypeDraft, LocationTypeDocument } from './LocationType.model';

export async function snapshot(locationType: LocationTypeDocument): Promise<LocationType> {
  return LocationType.findOne({ _id: locationType }).catch(err => {
    throw new Error(err);
  });
}

export async function create(draft: LocationTypeDraft): Promise<LocationType> {
  const locationType = new LocationType(draft);

  await locationType.save().catch(err => {
    throw new Error(err);
  });

  if (!locationType) throw new Error(`Can't create location type: ${JSON.stringify(draft)}`);

  return snapshot(locationType);
}

export async function update({ entity: locationKind, diff }: EntityUpdate<LocationType, LocationType>) {
  const draft = await LocationType.findOne(locationKind);

  if (!draft) throw new Error(`Can't find location type: ${locationKind.id}`);

  Object.assign(draft, diff);

  await draft.save().catch(err => {
    throw new Error(err);
  });
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
