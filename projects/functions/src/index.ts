import { https } from 'firebase-functions';

import { scrapInstagram } from './providers/instagram';
import { findOnGoogleMaps } from './providers/googleMaps';

// https://firebase.google.com/docs/functions/typescript

// export const parse = functions.https.onRequest(
// response.json()
export const parse = {
  instagram: https.onCall(scrapInstagram),
  googleMaps: https.onCall(findOnGoogleMaps),
};

export * from './providers/database';
