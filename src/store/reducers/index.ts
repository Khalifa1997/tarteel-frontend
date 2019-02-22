import { combineReducers } from 'redux';

import ayahsReducer from './ayahs';
import demographicDataReducer from './demographicData';
import evaluatorReducer from './evaluator';
import profileReducer from './profile';
import routerReducer from './router';
import statusReducer from './status';
import datasetReducer from './dataset';
import recognitionReducer from './recognition';

export default combineReducers({
  router: routerReducer,
  ayahs: ayahsReducer,
  status: statusReducer,
  profile: profileReducer,
  demographicData: demographicDataReducer,
  evaluator: evaluatorReducer,
  recognition: recognitionReducer,
  dataset: datasetReducer,
});
