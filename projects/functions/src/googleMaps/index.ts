import { createClient } from '@google/maps';

import { config } from '../configs';

let googleMapsClient: ReturnType<typeof createClient>;

export function googleMaps() {
  googleMapsClient =
    googleMapsClient ||
    createClient({
      key: config.googleMapsKey,
      Promise,
    });

  return googleMapsClient;
}
