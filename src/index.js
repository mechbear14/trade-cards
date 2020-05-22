import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import * as Firebase from "firebase/app";
import { FirebaseConfig } from "./FirebaseConfig";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { RootReducer } from "./store/reducers/RootReducer";

Firebase.initializeApp(FirebaseConfig);

const store = createStore(RootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
