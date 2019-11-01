import { GlobalState } from '../store';

export enum addActionTypes {
  VISIBILITY_CHANGE = 'add/VISIBILITY_CHANGE',
  ADD_POINT = 'add/ADD_POINT',
  ADD_POINT_SUCCESS = 'add/ADD_POINT_SUCCESS',
}

export const visibilityChange = (screenContent: GlobalState['add']) => ({
  type: addActionTypes.VISIBILITY_CHANGE,
  payload: screenContent,
});

export const addPoint = (data: object) => ({
  type: addActionTypes.ADD_POINT,
  payload: data,
});

export const addPointSuccess = () => ({
  type: addActionTypes.ADD_POINT_SUCCESS,
  payload: undefined,
});

export type AddActions = ReturnType<typeof visibilityChange | typeof addPoint | typeof addPointSuccess>;
