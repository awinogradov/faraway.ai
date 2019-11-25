/* eslint-disable no-underscore-dangle */
import { googleMaps } from '../../googleMaps';

import { Location, LocationDraft, LocationQuery } from './Location.model';

export async function snapshot(location: LocationQuery): Promise<Location> {
  return Location.findOne(location).catch(err => {
    throw new Error(err);
  });
}

export async function create(draft: LocationDraft): Promise<Location> {
  const location = new Location(draft);

  await location.save().catch(err => {
    throw new Error(err);
  });

  if (!location) {
    throw new Error(`Can't create location: ${JSON.stringify(draft)}`);
  }

  return snapshot(location);
}

export async function findOnGoogleMaps(search: { query: string }): Promise<LocationDraft> {
  const gmc = googleMaps();
  const googleMapsLocationGeocode = await gmc
    .geocode({
      address: search.query, // location.address || location.title
    })
    .asPromise();
  const googleMapsLocationGeocodeInfo = googleMapsLocationGeocode.json.results[0];

  const googleMapsLocation = await gmc.place({ placeid: googleMapsLocationGeocodeInfo.place_id }).asPromise();
  const googleMapsLocationInfo = googleMapsLocation.json.result;

  return {
    id: googleMapsLocationInfo.place_id,
    title: googleMapsLocationInfo.name,
    address: googleMapsLocationInfo.formatted_address,
    lat: googleMapsLocationGeocodeInfo.geometry.location.lat,
    lng: googleMapsLocationGeocodeInfo.geometry.location.lng,
  };
}

export async function remove(draft: LocationDraft) {
  await Location.deleteOne(draft).catch(err => {
    throw new Error(err);
  });
}

export function dangerouslyDropAllRecords() {
  return Location.deleteMany({});
}

export const locationPublicApi = {
  create: true,
  snapshot: true,
  findOnGoogleMaps: true,
};
export type LocationPublicApi = typeof locationPublicApi;
export type AllowedLocationPublicCalls = Array<keyof LocationPublicApi>;
export const allowedMethods = Object.keys(locationPublicApi) as AllowedLocationPublicCalls;
