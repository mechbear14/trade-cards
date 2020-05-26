import * as Firebase from "firebase/app";
import "firebase/functions";

export const getHistory = () => {
  return (dispatch, getState) => {
    let getHistoryByUser = Firebase.functions().httpsCallable(
      "getHistoryByUser"
    );
    getHistoryByUser({
      userId: getState().auth.loggedInUser.userId,
    })
      .then((connections) => {
        dispatch({
          type: "HISTORY_LOADED",
          connections: connections.data.connections,
        });
      })
      .catch((error) => {
        dispatch({
          type: "HISTORY_LOAD_ERROR",
          error,
        });
      });
  };
};

export const markStale = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "HISTORY_MARKED_STALE",
    });
  };
};
