import { getRepository } from 'typeorm';
import { v1 } from 'uuid';

import { logger } from '../../utils/logger';
import { GeoMap, GeoMapInput } from './GeoMap.entity';

export class GeoMapService {
  private repository = getRepository(GeoMap);

  find(): Promise<GeoMap[]> {
      logger.debug('find all geoMaps');
      return this.repository.find({});
  }

  findOne(id: string): Promise<GeoMap | undefined> {
      logger.debug('find one geoMap');
      return this.repository.findOne({ id });
  }

  async create(geoMap: GeoMapInput): Promise<GeoMap> {
      logger.debug('create a new geoMap => ', geoMap);
      const newGeoMap = new GeoMap();
      newGeoMap.id = v1();
      newGeoMap.title = geoMap.title;
      newGeoMap.description = geoMap.description;

      const savedGeoMap = await this.repository.save(newGeoMap);
      // this.eventDispatcher.dispatch(events.user.created, newUser);
      return savedGeoMap;
  }

  update(id: string, geoMap: GeoMap): Promise<GeoMap> {
      logger.debug('update a geoMap');
      geoMap.id = id;
      return this.repository.save(geoMap);
  }

  async delete(id: string): Promise<void> {
      logger.debug('delete a geoMap', id);
      await this.repository.delete(id);
      return;
  }
}
