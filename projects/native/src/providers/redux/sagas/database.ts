import { takeEvery, put, call } from 'redux-saga/effects';

import { databaseActionTypes } from '../constants/database';
import { processSuccess, processError } from '../actions/process';
import { databaseCreateCollection } from '../actions/database';

const createCollectrionProcess = 'createCollection';

function* createCollection(action: ReturnType<typeof databaseCreateCollection>) {
  const collection = yield call(() =>
    fetch('http://localhost:5000/faraway-ai/us-central1/db-collection-create', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    })
      .then(res => {
        if (!res.ok) return { error: res.statusText || 'Smth went wrong...' };

        return res.json();
      })
      .catch((error: Error) => error),
  );

  if (!collection.error) {
    yield put(processSuccess({ key: createCollectrionProcess, value: collection }));
  } else {
    yield put(processError({ key: createCollectrionProcess, error: new Error(collection.error) }));
  }
}

export function* databaseSaga() {
  yield takeEvery(databaseActionTypes.CREATE_COLLECTION, createCollection);
}
