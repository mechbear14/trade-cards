import * as Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Haikunator from "haikunator";

const getNewCallSign = () => {
  let haikunator = new Haikunator();
  let callSignRaw = haikunator.haikunate({
    tokenLength: 0,
    delimiter: " ",
  });
  let callSign = callSignRaw
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
  return callSign;
};

export const register = (password, email) => {
  return (dispatch, getState) => {
    let callSignRoot = getNewCallSign();
    let callSign = "";
    let a = Firebase.auth().createUserWithEmailAndPassword(email, password);
    let b = Firebase.firestore()
      .collection("users")
      .where("callSignRoot", "==", callSignRoot)
      .get();
    Promise.all([a, b])
      .then(([userCredential, querySnapshot]) => {
        let uid = userCredential.user.uid;
        let postfix = querySnapshot.docs.length;
        callSign = `${callSignRoot}${postfix === 0 ? "" : postfix}`;
        return Firebase.firestore().collection("users").doc(uid).set({
          callSignRoot,
          callSign,
          email,
        });
      })
      .then(() => {
        dispatch({
          type: "REGISTER",
          newUser: {
            email,
            callSign,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "REGISTER_ERROR",
          error,
        });
      });
  };
};

export const login = (email, password) => {
  return (dispatch, getState) => {};
};

export const recoverPassword = (email) => {
  return (dispatch, getState) => {};
};

export const resetErrors = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "RESET_REGISTER_ERRORS",
    });
  };
};
