import { ActionType, getType } from 'typesafe-actions';

import initState from '../initState';
import * as demographicData from '../actions/demographicData';
import {IDemographics} from "../../types/GlobalState";

export type DemographicsAction = ActionType<typeof demographicData>;

export const INITIAL_STATE = initState().demographicData;

export default (state: IDemographics = INITIAL_STATE, action: DemographicsAction) => {
  switch (action.type) {
    case getType(demographicData.setDemographicData):
      return action.payload;
    case getType(demographicData.updateDemographicData):
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
