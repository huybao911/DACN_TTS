import { combineReducers } from "redux";
import admin from "./admin";
import company from "./company";
import user from "./user";

import alert from "./alert";

const rootReducer = combineReducers({
  admin,
  company,
  user,
  alert,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
