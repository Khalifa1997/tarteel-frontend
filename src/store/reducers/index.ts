import {combineReducers} from "redux"

import ayahsReducer from "./ayahs"
import demographicDataReducer from "./demographicData"
import evaluatorReducer from "./evaluator"
import profileReducer from "./profile"
import routerReducer from "./router"
import statusReducer from "./status"
import recognitionReducer from "./recognition"
import usersReducer from "./users"

export default combineReducers({
  router: routerReducer,
  users: usersReducer,
  ayahs: ayahsReducer,
  status: statusReducer,
  profile: profileReducer,
  demographicData: demographicDataReducer,
  evaluator: evaluatorReducer,
  recognition: recognitionReducer,
})
