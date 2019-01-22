import {combineReducers} from "redux"

import usersReducer from "./users"
import ayahsReducer from "./ayahs"
import statusReducer from "./status"
import profileReducer from "./profile"
import demographicDataReducer from "./demographicData"
import evaluatorReducer from "./evaluator"
import routerReducer from "./router"

export default combineReducers({
  router: routerReducer,
  users: usersReducer,
  ayahs: ayahsReducer,
  status: statusReducer,
  profile: profileReducer,
  demographicData: demographicDataReducer,
  evaluator: evaluatorReducer,
})
