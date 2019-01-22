import {asyncComponent} from "react-async-component";
import {fetchUsers} from "../api/users";
import {IUser} from "../types/GlobalState";
import {setUsers} from "../store/actions/users";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ActionType} from "typesafe-actions";

interface IDispatchProps {
  setUsers(users: IUser[]): ActionType<typeof setUsers>;
}

interface IStateProps {
  users: IUser;
}

const mapDispatchToProps = (dispatch: Dispatch<ActionType<typeof setUsers>>): IDispatchProps => {
  return {
    setUsers:
      (users: IUser[]) => dispatch(setUsers(users))

  }
};

const mapStateToProps = (state: IStateProps): IStateProps => {
  return {
    users: state.users
  }
};

export const UsersContainer = {
  component: asyncComponent({
    resolve: () => import(/* webpackChunkName: "Users" */ '../pages/UsersPage')
      .then((Module) => {
        return connect(mapStateToProps, mapDispatchToProps)(Module.default)
      }),
  }),
  loadData: (store: any) => {
    return fetchUsers()
      .then((users: IUser[]) => {
        return store.dispatch(setUsers(users))
      })
  }
};
