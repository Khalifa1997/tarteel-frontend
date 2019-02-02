import { ActionType, getType } from 'typesafe-actions';

import {IUser} from "../../types/GlobalState";
import * as users from '../actions/users';
import initState from '../initState';

export type UsersAction = ActionType<typeof users>;

export const INITIAL_STATE = initState().users;

export default (state: IUser[] = INITIAL_STATE, action: UsersAction) => {
  switch (action.type) {
    case getType(users.setUsers):
      return action.payload;
    default:
      return state;
  }
};
