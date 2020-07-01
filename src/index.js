import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// import * as Firebase from "firebase/app";
// import { FirebaseConfig } from "./FirebaseConfig";

// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";

// import { RootReducer } from "./store/reducers/RootReducer";

// Firebase.initializeApp(FirebaseConfig);

// const store = createStore(RootReducer, applyMiddleware(thunk));

// Firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     Firebase.firestore()
//       .collection("users")
//       .doc(user.uid)
//       .get()
//       .then((userDoc) => {
//         let currentUser = {
//           userId: user.uid,
//           callSign: userDoc.data().callSign,
//         };
//         store.dispatch({
//           type: "OPEN_APP",
//           user: currentUser,
//           userRef: userDoc.ref,
//         });
//       });
//   } else {
//     let currentUser = null;
//     store.dispatch({
//       type: "OPEN_APP",
//       user: currentUser,
//     });
//   }
// });

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
