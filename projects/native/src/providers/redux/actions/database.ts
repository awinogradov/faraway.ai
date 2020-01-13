import { createAction } from '../../../utils/actionCreator';
import { databaseActionTypes } from '../constants/database';
import { CreateJourney } from '../../../typings/functions';

export const databaseCreateJourney = (draft: CreateJourney) =>
  createAction(databaseActionTypes.CREATE_COLLECTION, draft);
