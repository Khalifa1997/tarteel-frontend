import { createAction } from 'typesafe-actions';

export const setLocation = createAction('router/SET_LOCATION', resolve => {
  return (location: Location) => resolve(location);
});
