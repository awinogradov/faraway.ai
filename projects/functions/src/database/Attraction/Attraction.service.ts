import { EntityUpdate } from '../../typings';

import { Attraction, AttractionDraft } from './Attraction.model';

export async function snapshot(attraction: Attraction): Promise<Attraction> {
  return Attraction.findOne(attraction)
    .populate('location')
    .populate('collections')
    .populate('createdBy')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: AttractionDraft): Promise<Attraction> {
  const attraction = new Attraction(draft);

  await attraction.save().catch(err => {
    throw new Error(err);
  });

  if (!attraction) {
    throw new Error(`Can't create attraction: ${JSON.stringify(draft)}`);
  }

  return snapshot(attraction);
}

export async function update({
  entity: attraction,
  diff,
}: EntityUpdate<Attraction, Omit<AttractionDraft, 'createdBy'>>): Promise<Attraction> {
  const draft = await Attraction.findOne(attraction);

  if (!draft) {
    throw new Error(`Can't find attraction "${JSON.stringify(attraction)}"`);
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

export async function remove(draft: AttractionDraft) {
  await Attraction.deleteOne(draft).catch(err => {
    throw new Error(err);
  });
}

export function dangerouslyDropAllRecords() {
  return Attraction.deleteMany({});
}

export const attractionPublicApi = {
  create: true,
  snapshot: true,
  update: true,
  remove: true,
};
export type AttractionPublicApi = typeof attractionPublicApi;
export type AllowedAttractionPublicCalls = Array<keyof AttractionPublicApi>;
export const allowedMethods = Object.keys(attractionPublicApi) as AllowedAttractionPublicCalls;
