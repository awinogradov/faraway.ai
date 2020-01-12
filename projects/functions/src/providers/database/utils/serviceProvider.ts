/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as functions from 'firebase-functions';

import { connect } from './connection';

export function provideService<S extends Record<string, any>>(service: S) {
  return service.allowedMethods.reduce((api: Record<string, any>, method: string) => {
    api[method] = functions.https.onRequest(async (req, res) => {
      await connect();

      let props = req.body;

      if (typeof props === 'string') {
        props = JSON.parse(props);
      }

      return res.json(await service[method](props));
    });

    return api;
  }, {});
}
