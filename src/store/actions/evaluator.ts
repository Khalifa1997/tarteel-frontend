import humps from 'humps';
import { createAction } from 'typesafe-actions';

import AyahShape from '../../shapes/AyahShape';

export const setAyah = createAction('evaluator/SET', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah));
});

export const increaseStep = createAction('evaluator/INCREASE_STEP', resolve => {
  return () => resolve();
});

export const setNextAyah = createAction('evaluator/SET_NEXT_AYAH', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah));
});

export const setPreviousAyah = createAction(
  'evaluator/SET_PREV_AYAH',
  resolve => {
    return (ayah: AyahShape) => resolve(ayah);
  }
);

export default {
  setAyah,
  increaseStep,
  setNextAyah,
  setPreviousAyah,
};
