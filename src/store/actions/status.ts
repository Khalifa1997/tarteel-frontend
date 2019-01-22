import { createAction } from 'typesafe-actions';

export const toggleIsRecording = createAction('status/TOGGLE_RECORDING', resolve => {
  return () => resolve();
});
export const toggleDoneRecording = createAction('status/TOGGLE_DONE_RECORDING', resolve => {
  return () => resolve();
});
export const togglePassedOnBoarding = createAction('status/TOGGLE_ON_BOARDING', resolve => {
  return () => resolve();
});
export const toggleIsContinuous = createAction('status/TOGGLE_CONTINUOUS', resolve => {
  return () => resolve();
});
export const toggleIsFetching = createAction('status/TOGGLE_IS_FETCHING', resolve => {
  return () => resolve();
});
