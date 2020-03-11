import { takeEvery, put, call } from 'redux-saga/effects';

import { databaseActionTypes } from '../constants/database';
import { processTypes } from '../constants/process';
import { processSuccess, processError, deleteProcess, emitProcess } from '../actions/process';
import { closeBottomSheet } from '../actions/app';
import { databaseCreateJourney, databaseDoneJourney } from '../actions/database';

function* createJourney(action: ReturnType<typeof databaseCreateJourney>) {
  yield put(emitProcess(processTypes.createJourneyProcess));

  const journey = yield call(() =>
    fetch('http://localhost:5000/faraway-ai/us-central1/db-journey-create', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    })
      .then(res => {
        if (!res.ok) return { error: res.statusText || 'Smth went wrong...' };

        return res.json();
      })
      .catch((error: Error) => ({ error })),
  );

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

export function* databaseSaga() {
  yield takeEvery(databaseActionTypes.CREATE_JOURNEY, createJourney);
  yield takeEvery(databaseActionTypes.DONE_JOURNEY, doneJourney);
}
