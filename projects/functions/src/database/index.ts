/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as collectionService from './Collection/Collection.service';
import * as userService from './User/User.service';
import { provideService } from './utils/serviceProvider';

export const db = {
  user: provideService(userService),
  collection: provideService(collectionService),
};
