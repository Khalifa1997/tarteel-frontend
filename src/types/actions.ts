import { createAsyncAction } from 'typesafe-actions';

import IAyahShape from '../shapes/IAyahShape';

export const LOAD_NEXT_AYAH_STARTED = 'LOAD_NEXT_AYAH_STARTED';
export const LOAD_NEXT_AYAH_SUCCESS = 'LOAD_NEXT_AYAH_SUCCESS';
export const LOAD_NEXT_AYAH_FAILED = 'LOAD_NEXT_AYAH_FAILED';
export const LOAD_PREV_AYAH_STARTED = 'LOAD_PREV_AYAH_STARTED';
export const LOAD_PREV_AYAH_SUCCESS = 'LOAD_PREV_AYAH_SUCCESS';
export const LOAD_PREV_AYAH_FAILED = 'LOAD_PREV_AYAH_FAILED';

export const nextAyahAction = createAsyncAction(
  LOAD_NEXT_AYAH_STARTED,
  LOAD_NEXT_AYAH_SUCCESS,
  LOAD_NEXT_AYAH_FAILED
)<void, IAyahShape, Error>();

export const prevAyahAction = createAsyncAction(
  LOAD_PREV_AYAH_STARTED,
  LOAD_PREV_AYAH_SUCCESS,
  LOAD_PREV_AYAH_FAILED
)<void, IAyahShape, Error>();
