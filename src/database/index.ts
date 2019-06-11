import { GeoMapResolver } from './GeoMap/GeoMap.resolver';
import { User } from './User/User.entity';
import { GeoMap } from './GeoMap/GeoMap.entity';

export const resolvers = [GeoMapResolver];
export const entities = [GeoMap, User];
