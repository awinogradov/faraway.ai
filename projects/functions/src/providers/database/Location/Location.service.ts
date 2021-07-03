/* eslint-disable no-underscore-dangle */
import { googleMaps, googleMapsPhotoUrl } from '../../googleMaps';
import * as locationTypeService from '../LocationType/LocationType.service';
import * as journeyService from '../Journey/Journey.service';

import { Location, LocationDraft, LocationQuery } from './Location.model';

export async function snapshot(location: LocationQuery): Promise<Location> {
  return Location.findOne(location)
    .populate('type')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: LocationDraft) {
  const locationType = await locationTypeService.snapshot(draft.type);
  // @ts-ignore
  const journey = await journeyService.snapshot(draft.journeys[0]);
  const location = await new Location({
    ...draft,
    type: locationType,
  })
    .save()
    .catch(err => {
      throw new Error(err);
    });

  if (!location) throw new Error(`Can't create location: ${JSON.stringify(draft)}`);

  await journeyService.update({ entity: journey, diff: { locations: [...journey.locations, location] } });
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
