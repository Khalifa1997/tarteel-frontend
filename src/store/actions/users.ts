import { createAction } from 'typesafe-actions';
import {IUser} from "../../types/GlobalState";

export const setUsers = createAction('users/SET', resolve => {
  return (users: IUser[]) => resolve(users);
});
