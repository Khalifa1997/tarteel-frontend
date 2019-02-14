import { ActionType, getType } from 'typesafe-actions';

import * as dataset from '../actions/dataset';
import initState from '../initState';
import {IDataset} from "../../types/GlobalState";

export type DatasetAction = ActionType<typeof dataset>;

export const INITIAL_STATE = initState().dataset;

export default (state: IDataset = INITIAL_STATE, action: DatasetAction) => {
  switch (action.type) {
    case getType(dataset.setDatasetRecordings):
      return {
        ...state,
        sample: action.payload,
      };
    default:
      return state;
  }
};
