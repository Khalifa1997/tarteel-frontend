import {createAction} from "typesafe-actions";
import humps from "humps";

import AyahShape from "../../shapes/AyahShape";


export const setAyah = createAction('evaluator/SET', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah))
});

export const increaseStep = createAction('evaluator/INCREASE_STEP', resolve => {
  return () => resolve()
});

export const setNextAyah = createAction('evaluator/SET_NEXT_AYAH', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah))
});
