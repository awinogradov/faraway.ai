import { Query, Resolver, Mutation, Arg /*, Subscription*/} from 'type-graphql';

import { GeoMap, GeoMapInput } from './GeoMap.entity';
import { GeoMapService } from './GeoMap.service';

@Resolver(() => GeoMap)
export class GeoMapResolver {
  private service = new GeoMapService();

  @Query(() => [GeoMap])
  async geoMaps(): Promise<GeoMap[]> {
    return await this.service.find();
  }

  @Mutation(() => GeoMap)
  async createGeoMap(@Arg('geoMap') geoMap: GeoMapInput): Promise<GeoMap> {
    return await this.service.create(geoMap);
  }
}
