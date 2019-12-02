import { GoogleMapRes, GoogleMapsProps } from 'faraway.ai-functions';

import { GlobalState } from '../store';

export enum addActionTypes {
  VISIBILITY_CHANGE = 'add/VISIBILITY_CHANGE',
  ADD_POINT = 'add/ADD_POINT',
  ADD_POINT_SUCCESS = 'add/ADD_POINT_SUCCESS',
  LOAD_POINT_DESCRIPTION = 'add/LOAD_POINT_DESCRIPTION',
  LOAD_POINT_DESCRIPTION_SUCCESS = 'add/LOAD_POINT_DESCRIPTION_SUCCESS',
}

export const visibilityChange = (screenContent: GlobalState['add']) => ({
  type: addActionTypes.VISIBILITY_CHANGE,
  payload: screenContent,
});

export const loadPointDescription = (query: GoogleMapsProps) => ({
  type: addActionTypes.LOAD_POINT_DESCRIPTION,
  payload: query,
});

export const loadPointDescriptionSuccess = (data: GoogleMapRes) => ({
  type: addActionTypes.LOAD_POINT_DESCRIPTION_SUCCESS,
  payload: data,
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
