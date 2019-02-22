import { ActionType, getType } from 'typesafe-actions';

import ReduxState from '../../types/GlobalState';
import * as status from '../actions/status';
import initState from '../initState';

export type StatusAction = ActionType<typeof status>;

export const INITIAL_STATE = initState().status;

export default (
  state: ReduxState['status'] = INITIAL_STATE,
  action: StatusAction
) => {
  switch (action.type) {
    case getType(status.toggleIsRecording):
      return {
        ...state,
        isRecording: !state.isRecording,
      };
    case getType(status.toggleDoneRecording):
      return {
        ...state,
        isDoneRecording: !state.isDoneRecording,
      };
    case getType(status.toggleIsContinuous):
      return {
        ...state,
        isContinuous: !state.isContinuous,
      };
    case getType(status.toggleIsFetching):
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    default:
      return state;
  }
};
