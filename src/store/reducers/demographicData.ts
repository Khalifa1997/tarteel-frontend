import { ActionType, getType } from 'typesafe-actions';

import { IDemographics } from '../../types/GlobalState';
import * as demographicData from '../actions/demographicData';
import initState from '../initState';

export type DemographicsAction = ActionType<typeof demographicData>;

export const INITIAL_STATE = initState().demographicData;

export default (
  state: IDemographics = INITIAL_STATE,
  action: DemographicsAction
) => {
  switch (action.type) {
    case getType(demographicData.setDemographicData):
      return action.payload;
    case getType(demographicData.updateDemographicData):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
