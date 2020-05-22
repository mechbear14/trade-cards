import { combineReducers } from "redux";

import { AuthReducer } from "./AuthReducer";
import { CardReducer } from "./CardReducer";
import { ConnectionReducer } from "./ConnectionReducer";

export const RootReducer = combineReducers({
  auth: AuthReducer,
  card: CardReducer,
  connection: ConnectionReducer,
});
