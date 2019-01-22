import { ActionType, getType } from 'typesafe-actions';

import initState from '../initState';
import * as evaluator from '../actions/evaluator';
import ReduxState from "../../types/GlobalState";

export type evaluatorActions = ActionType<typeof evaluator>;

export const INITIAL_STATE = initState().evaluator;

export default (state: ReduxState['evaluator']  = INITIAL_STATE, action: evaluatorActions) => {
  switch (action.type) {
    case getType(evaluator.setAyah):
      return {
        ...state,
        currentAyah: action.payload,
      }
    case getType(evaluator.setNextAyah):
      return {
        ...state,
        nextAyah: action.payload,
      }
    case getType(evaluator.increaseStep):
      return {
        ...state,
        currentStep: state.currentStep + 1,
      }

    default:
      return state;
  }
};
