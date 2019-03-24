import { createAction } from 'typesafe-actions';
import humps from 'humps';

export const setRecognitionResults = createAction(
  'recognition/SET_RECOGNITION_RESULTS',
  resolve => {
    return (result: any) => resolve(humps.camelizeKeys(result));
  }
);
