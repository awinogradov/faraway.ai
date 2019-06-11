import faker from 'faker';
import { v1 } from 'uuid';
import { Connection } from 'typeorm';

import { SeedFactory } from '../../utils/testing/SeedFactory';
import { GeoMap } from './GeoMap.entity';

class GeoMapSeedFactory extends SeedFactory<GeoMap> {
  name = 'GeoMap';

  create() {
    const geoMap = new GeoMap();
    geoMap.id = v1();
    geoMap.title = faker.address.country();
    geoMap.description = faker.lorem.sentence();

    return geoMap;
  }
}

class FakeGeoMaps {
  async seed(dbConnection: Connection): Promise<GeoMap[]> {
    const manager = dbConnection.createEntityManager();
    const geoMapFactory = new GeoMapSeedFactory();

    const geoMaps = await geoMapFactory.many(10);
    return Promise.all(geoMaps.map(geoMap => manager.save(geoMap)));
  }
}

export const geoMaps = new FakeGeoMaps();


