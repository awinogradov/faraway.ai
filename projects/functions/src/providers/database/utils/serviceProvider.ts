/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as functions from 'firebase-functions';

import { connect } from './connection';

export function provideService<S extends Record<string, any>>(service: S) {
  return service.allowedMethods.reduce((api: Record<string, any>, method: string) => {
    api[method] = functions.https.onCall(async data => {
      await connect();
      return service[method](data);
    });

    return api;
  }, {});
}
