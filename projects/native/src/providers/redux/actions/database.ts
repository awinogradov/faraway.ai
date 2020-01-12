import { createAction } from '../../../utils/actionCreator';
import { databaseActionTypes } from '../constants/database';
import { CreateCollection } from '../../../typings/functions';

export const databaseCreateCollection = (draft: CreateCollection) =>
  createAction(databaseActionTypes.CREATE_COLLECTION, draft);
