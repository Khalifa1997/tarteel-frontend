import { ActionType, getType } from 'typesafe-actions';

import initState from '../initState';
import * as profile from '../actions/profile';
import {IProfile} from "../../types/GlobalState";

export type ProfileAction = ActionType<typeof profile>;

export const INITIAL_STATE = initState().profile;

export default (state: IProfile = INITIAL_STATE, action: ProfileAction) => {
  switch (action.type) {
    case getType(profile.increaseRecitedAyahs):
      return {
        ...state,
        recordingCount: state.recordingCount + 1,
        dailyCount: state.dailyCount + 1,
        userRecitedAyahs: state.userRecitedAyahs + 1,
      };
    case getType(profile.setUserRecitedAyahs):
      return {
        ...state,
        userRecitedAyahs: action.payload
      }
    case getType(profile.setFetchedProfile):
      return {
        ...state,
        ...action.payload
      }
    case getType(profile.setPassedOnBoarding):
      return {
        ...state,
        passedOnBoarding: true,
      }
    default:
      return state;
  }
};
