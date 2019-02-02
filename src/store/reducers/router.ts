import { ActionType, getType } from 'typesafe-actions';

import * as router from '../actions/router';
import initState from '../initState';

export type RouterAction = ActionType<typeof router>;

export const INITIAL_STATE = initState().router;

export default (state: {location: Location} = INITIAL_STATE, action: RouterAction) => {
  switch (action.type) {
    case getType(router.setLocation):
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};
