import { takeEvery, put, call } from 'redux-saga/effects';

import { databaseActionTypes } from '../constants/database';
import { processTypes } from '../constants/process';
import { processSuccess, processError } from '../actions/process';
import { databaseCreateJourney } from '../actions/database';

function* createJourney(action: ReturnType<typeof databaseCreateJourney>) {
  const journey = yield call(() =>
    fetch('http://localhost:5000/faraway-ai/us-central1/db-journey-create', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    })
      .then(res => {
        if (!res.ok) return { error: res.statusText || 'Smth went wrong...' };

        return res.json();
      })
      .catch((error: Error) => error),
  );

  if (!journey.error) {
    yield put(processSuccess({ key: processTypes.createJourneyProcess, value: journey }));
  } else {
    yield put(processError({ key: processTypes.createJourneyProcess, error: new Error(journey.error) }));
  }
}

export function* databaseSaga() {
  yield takeEvery(databaseActionTypes.CREATE_JOURNEY, createJourney);
}
