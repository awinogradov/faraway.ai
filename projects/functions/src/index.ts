import { https } from 'firebase-functions';

import { scrapInstagram, InstagramProps, InstagramPostProps } from './providers/instagram';
import { findOnGoogleMaps, GoogleMapsProps } from './providers/googleMaps';

// https://firebase.google.com/docs/functions/typescript

// export const parse = functions.https.onRequest(
// response.json()
export const parse = {
  instagram: https.onCall(scrapInstagram),
  googleMaps: https.onCall(findOnGoogleMaps),
};

export * from './providers/database';
export type InstagramParseProps = InstagramProps;
export type GoogleMapsParseProps = GoogleMapsProps;
export type InstagramParsedPostProps = InstagramPostProps;
