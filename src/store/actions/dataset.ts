import {createAction} from "typesafe-actions";

export const setDatasetRecordings = createAction('dataset/SET_SAMPLE', resolve => {
  return (sampleList: string[]) => resolve(sampleList);
});
