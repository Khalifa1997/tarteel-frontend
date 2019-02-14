import humps from 'humps';
import { createAction } from 'typesafe-actions';

import {IProfile} from "../../types/GlobalState";

export const increaseRecitedAyahs = createAction('profile/INCREASE_RECITED_AYAHS', resolve => {
  return () => resolve();
});
export const setUserRecitedAyahs = createAction('profile/SET_USER_RECITED_AYAHS', resolve => {
  return (value: number) => resolve(value);
});
export const setPassedOnBoarding = createAction('profile/SET_PASSED_ONBOARDING', resolve => {
  return () => resolve();
});
export const unsetAskForDemographics = createAction('profile/UNSET_ASK_FOR_DEMOGRAPHICS', resolve => {
  return () => resolve();
});
export const setFetchedProfile = createAction('profile/SET_FETCHED_PROFILE', resolve => {
  return (profile: Partial<IProfile>) => resolve(humps.camelizeKeys(profile));
});
export const increaseEvaluatedAyahs = createAction('profile/INCREASE_EVALUATED_AYAHS', resolve => {
  return () => resolve();
});
