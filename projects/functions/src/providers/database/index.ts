/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as collectionService from './Collection/Collection.service';
import * as locationService from './Location/Location.service';
import * as noteService from './Note/Note.service';
import * as userService from './User/User.service';
import * as attractionService from './Attraction/Attraction.service';
import { provideService } from './utils/serviceProvider';

export const db = {
  location: provideService(locationService),
  note: provideService(noteService),
  user: provideService(userService),
  collection: provideService(collectionService),
  attraction: provideService(attractionService),
};
