import { takeEvery, put, call } from 'redux-saga/effects';

import { databaseActionTypes } from '../constants/database';
import { processTypes } from '../constants/process';
import { processSuccess, processError, deleteProcess, emitProcess } from '../actions/process';
import { closeBottomSheet } from '../actions/app';
import {
  databaseCreateJourney,
  databaseDoneJourney,
  databaseDonePoint,
  databaseCreatePoint,
} from '../actions/database';
import { ask, remote } from '../../functions';

function* createJourney(action: ReturnType<typeof databaseCreateJourney>) {
  yield put(emitProcess(processTypes.createJourneyProcess));

  const journey = yield call(() => ask({ function: remote.dbJourneyCreate, payload: action.payload }));

  if (!journey.error) {
    yield put(processSuccess({ key: processTypes.createJourneyProcess, value: journey }));
  } else {
    yield put(processError({ key: processTypes.createJourneyProcess, error: journey.error }));
  }
}

function* doneJourney(action: ReturnType<typeof databaseDoneJourney>) {
  yield put(closeBottomSheet(action.payload));
  yield put(deleteProcess(processTypes.createJourneyProcess));
}

function* createPoint(action: ReturnType<typeof databaseCreatePoint>) {
  yield put(emitProcess(processTypes.createPointProcess));

  const point = yield call(() => ask({ function: remote.dbLocationCreate, payload: action.payload }));

  if (!point.error) {
    yield put(processSuccess({ key: processTypes.createPointProcess, value: point }));
  } else {
    yield put(processError({ key: processTypes.createPointProcess, error: point.error }));
  }
}

function* donePoint(action: ReturnType<typeof databaseDonePoint>) {
  yield put(closeBottomSheet(action.payload));
  yield put(deleteProcess(processTypes.createJourneyProcess));
}

export function* databaseSaga() {
  yield takeEvery(databaseActionTypes.CREATE_JOURNEY, createJourney);
  yield takeEvery(databaseActionTypes.DONE_JOURNEY, doneJourney);

  yield takeEvery(databaseActionTypes.CREATE_POINT, createPoint);
  yield takeEvery(databaseActionTypes.DONE_POINT, donePoint);
}
