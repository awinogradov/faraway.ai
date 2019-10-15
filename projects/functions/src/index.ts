import * as functions from 'firebase-functions';

import {resolveParseStrategy} from './parse';

// https://firebase.google.com/docs/functions/typescript

// export const parse = functions.https.onRequest(
// response.json()
export const parse = functions.https.onCall(
  async (data) => {
    return await resolveParseStrategy(data.url);
  },
);
