import { createAction } from '../../../utils/actionCreator';
import { databaseActionTypes } from '../constants/database';
import { CreateJourney, CreatePoint } from '../../../typings/functions';

export const databaseCreateJourney = (draft: CreateJourney) => createAction(databaseActionTypes.CREATE_JOURNEY, draft);
export const databaseDoneJourney = (timeout: number = 0) => createAction(databaseActionTypes.DONE_JOURNEY, timeout);

export const databaseCreatePoint = (draft: CreatePoint) => createAction(databaseActionTypes.CREATE_POINT, draft);
export const databaseDonePoint = (timeout: number = 0) => createAction(databaseActionTypes.DONE_POINT, timeout);
