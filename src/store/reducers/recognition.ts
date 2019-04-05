import { ActionType, getType } from 'typesafe-actions';

import * as recognition from '../actions/recognition';
import initState from '../initState';
import { IRecognition } from '../../types/GlobalState';

export type RecognitionAction = ActionType<typeof recognition>;

export const INITIAL_STATE = initState().recognition;

export default (
  state: IRecognition = INITIAL_STATE,
  action: RecognitionAction
) => {
  switch (action.type) {
    case getType(recognition.setRecognitionResults):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
