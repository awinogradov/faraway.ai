import { AppStateStatus } from 'react-native';

export enum appActionTypes {
  STATE_CHANGE = 'app/STATE_CHANGE',
  STATE_ACTIVE = 'app/STATE_ACTIVE',
}

export const stateChange = (appState: AppStateStatus) => ({
  type: appActionTypes.STATE_CHANGE,
  payload: appState,
});

export const stateActive = () => ({
  type: appActionTypes.STATE_ACTIVE,
});

export type AppActions = ReturnType<typeof stateChange> | ReturnType<typeof stateActive>;
