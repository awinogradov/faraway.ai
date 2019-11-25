import * as functions from 'firebase-functions';

import { resolveParseStrategy } from './parse';

// const envinfo = require('envinfo');

// envinfo.run(
//   {
//     System: ['OS', 'CPU', 'Memory', 'Shell'],
//     Binaries: ['Node', 'Yarn', 'npm'],
//     Databases: ['MongoDB'],
//   },
//   { json: true, console: true, showNotFound: true },
// );

// https://firebase.google.com/docs/functions/typescript

// export const parse = functions.https.onRequest(
// response.json()
export const parse = {
  main: functions.https.onCall(async data => {
    return resolveParseStrategy(data.url);
  }),
};

export * from './database';
