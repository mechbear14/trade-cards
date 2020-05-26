import { combineReducers } from "redux";

import { AuthReducer } from "./AuthReducer";
import { TodayReducer } from "./TodayReducer";
import { HistoryReducer } from "./HistoryReducer";
import { ViewReducer } from "./ViewReducer";

export const RootReducer = combineReducers({
  auth: AuthReducer,
  today: TodayReducer,
  history: HistoryReducer,
  view: ViewReducer,
});
