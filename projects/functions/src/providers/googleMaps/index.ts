import { https } from 'firebase-functions';
import { createClient, PlaceReview } from '@google/maps';

import { config } from '../../configs';

export interface GoogleMapRes {
  id: string;
  title: string;
  address: string;
  lat: number;
  lng: number;
  reviews?: PlaceReview[];
  rating?: number;
  /** Top photos on location page on GoogleMaps */
  photos?: string[];
  /** Link to show point on Google Maps */
  ref: string;
}

export interface GoogleMapsProps {
  address: string;
  region?: string;
}

let googleMapsClient: ReturnType<typeof createClient>;

export function googleMaps() {
  googleMapsClient =
    googleMapsClient ||
    createClient({
      key: config.googleMaps.key,
      Promise,
    });

  return googleMapsClient;
}

async function findOnGoogleMaps(search: GoogleMapsProps): Promise<GoogleMapRes> {
  const gmc = googleMaps();
  const googleMapsLocationGeocode = await gmc.geocode(search).asPromise();
  const googleMapsLocationGeocodeInfo = googleMapsLocationGeocode.json.results[0];

  const googleMapsLocation = await gmc.place({ placeid: googleMapsLocationGeocodeInfo.place_id }).asPromise();
  const googleMapsLocationInfo = googleMapsLocation.json.result;

  return {
    id: googleMapsLocationInfo.place_id,
    title: googleMapsLocationInfo.name,
    address: googleMapsLocationInfo.formatted_address,
    lat: googleMapsLocationGeocodeInfo.geometry.location.lat,
    lng: googleMapsLocationGeocodeInfo.geometry.location.lng,
    reviews: googleMapsLocationInfo.reviews,
    rating: googleMapsLocationInfo.rating,
    // TODO: map via https://developers.google.com/places/web-service/photos#place_photo_requests
    photos: googleMapsLocationInfo.photos && googleMapsLocationInfo.photos.map(photo => photo.photo_reference),
    ref: googleMapsLocationInfo.url,
  };
}

export const googleMapsSearch = https.onRequest(async (req, res) => {
  let props = req.body;

  if (typeof props === 'string') {
    props = JSON.parse(props);
  }

  res.json(await findOnGoogleMaps(props));
});
