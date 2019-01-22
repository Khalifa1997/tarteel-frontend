import { createAction } from 'typesafe-actions';
import {IDemographics} from "../../types/GlobalState";

export const setDemographicData = createAction('demographicData/SET', resolve => {
  return (data: IDemographics) => resolve(data);
});
export const updateDemographicData = createAction('demographicData/UPDATE', resolve => {
  return (data: Partial<IDemographics>) => resolve(data);
});
