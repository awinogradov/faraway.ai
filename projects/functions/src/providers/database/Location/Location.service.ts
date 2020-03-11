/* eslint-disable no-underscore-dangle */
import { googleMaps, googleMapsPhotoUrl } from '../../googleMaps';
import * as locationKindService from '../LocationType/LocationType.service';

import { Location, LocationDraft, LocationQuery } from './Location.model';

export async function snapshot(location: LocationQuery): Promise<Location> {
  return Location.findOne(location)
    .populate('type')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: LocationDraft): Promise<Location> {
  const location = new Location(draft);
  const locationKind = await locationKindService.snapshot(location.type);

  await location.save().catch(err => {
    throw new Error(err);
  });

  locationKind.locations.push(location);
  await locationKindService.update({ entity: locationKind, diff: { locations: locationKind.locations } });

  if (!location) throw new Error(`Can't create location: ${JSON.stringify(draft)}`);

  return snapshot(location);
}

export async function findOnGoogleMaps(search: { query: string }) {
  const gmc = googleMaps();
  const googleMapsLocationGeocode = await gmc
    .geocode({
      address: search.query, // location.address || location.title
    })
    .asPromise();
  const googleMapsLocationGeocodeInfo = googleMapsLocationGeocode.json.results;

  return Promise.all(
    googleMapsLocationGeocodeInfo.map(async geocodeInfo => {
      const googleMapsLocation = await gmc.place({ placeid: geocodeInfo.place_id }).asPromise();
      const googleMapsLocationInfo = googleMapsLocation.json.result;

      return {
        id: googleMapsLocationInfo.place_id,
        title: googleMapsLocationInfo.name,
        address: googleMapsLocationInfo.formatted_address,
        lat: geocodeInfo.geometry.location.lat,
        lng: geocodeInfo.geometry.location.lng,
        photos: googleMapsLocationInfo.photos.map(photo => googleMapsPhotoUrl(photo.photo_reference)),
      };
    }),
  );
}

export async function remove(draft: LocationDraft) {
  await Location.deleteOne(draft).catch(err => {
    throw new Error(err);
  });
}

export const locationPublicApi = {
  create,
  snapshot,
  findOnGoogleMaps,
};
export type LocationPublicApi = typeof locationPublicApi;
export type AllowedLocationPublicCalls = Array<keyof LocationPublicApi>;
export const allowedMethods = Object.keys(locationPublicApi) as AllowedLocationPublicCalls;
