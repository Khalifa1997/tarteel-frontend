import humps from 'humps';
import { createAction } from 'typesafe-actions';

import IAyahShape from '../../shapes/IAyahShape';

export const setAyah = createAction('evaluator/SET', resolve => {
  return (ayah: IAyahShape) => resolve(humps.camelizeKeys(ayah));
});

export const increaseStep = createAction('evaluator/INCREASE_STEP', resolve => {
  return () => resolve();
});

export const setNextAyah = createAction('evaluator/SET_NEXT_AYAH', resolve => {
  return (ayah: IAyahShape) => resolve(humps.camelizeKeys(ayah));
});

export const setPreviousAyah = createAction(
  'evaluator/SET_PREV_AYAH',
  resolve => {
    return (ayah: IAyahShape) => resolve(ayah);
  }
);

export default {
  setAyah,
  increaseStep,
  setNextAyah,
  setPreviousAyah,
};
