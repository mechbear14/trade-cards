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
    dispatch({
      type: "REQUEST_STARTED",
    });
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

export const login = (callSign, password) => {
  return (dispatch, getState) => {
    dispatch({
      type: "REQUEST_STARTED",
    });
    let userId = null;
    Firebase.firestore()
      .collection("users")
      .where("callSign", "==", callSign)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          let email = querySnapshot.docs[0].data().email;
          return Firebase.auth().signInWithEmailAndPassword(email, password);
        } else {
          return new Promise((resolve, reject) => {
            reject({
              message: "This call sign does not exist for the current season",
            });
          });
        }
      })
      .then((userCredential) => {
        userId = userCredential.user.uid;
        return Firebase.firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .get();
      })
      .then((userDoc) => {
        dispatch({
          type: "LOGIN",
          loggedInUser: {
            userId,
            callSign,
          },
          loggedInUserRef: userDoc.ref,
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_ERROR",
          error,
        });
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    Firebase.auth()
      .signOut()
      .then(
        dispatch({
          type: "LOGOUT",
        })
      )
      .catch((error) => {
        dispatch({
          type: "LOGOUT_ERROR",
          error,
        });
      });
  };
};

export const recoverPassword = (email) => {
  return (dispatch, getState) => {};
};

export const resetLoginError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "RESET_LOGIN_ERROR",
    });
  };
};

export const resetRegisterError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "RESET_REGISTER_ERROR",
    });
  };
};
