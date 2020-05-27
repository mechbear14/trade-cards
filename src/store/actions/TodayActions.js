import * as Firebase from "firebase/app";
import "firebase/functions";

export const loadToday = () => {
  return (dispatch, getState) => {
    let getTodayByUser = Firebase.functions().httpsCallable("getTodayByUser");
    getTodayByUser({
      userId: getState().auth.loggedInUser.userId,
    })
      .then((userTodayState) => {
        dispatch({
          type: "TODAY_LOADED",
          cardToday: userTodayState.data.cardToday,
          responded: userTodayState.data.responded,
          connectionToday: userTodayState.data.connectionToday,
        });
      })
      .catch((error) => {
        dispatch({
          type: "TODAY_LOAD_ERROR",
          error,
        });
      });
  };
};

export const validateError = (errorMsg) => {
  return (dispatch, getState) => {
    dispatch({
      type: "INVALID_RESPONSE",
      error: { message: errorMsg },
    });
  };
};

export const resetError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "RESET_ERROR",
    });
  };
};

export const respondWith = (kind, text) => {
  let card = { kind, text };
  return (dispatch, getState) => {
    dispatch({
      type: "RESPOND_STARTED",
    });
    let respondWithCard = Firebase.functions().httpsCallable("respondWithCard");
    respondWithCard({
      userId: getState().auth.loggedInUser.userId,
      card1Id: getState().today.cardToday.id,
      card2: card,
    })
      .then((newObjects) => {
        dispatch({
          type: "RESPONDED",
          connectionToday: {
            id: newObjects.data.connectionId,
            card1: getState().today.cardToday,
            card2: {
              id: newObjects.data.card2Id,
              ...card,
            },
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "RESPOND_ERROR",
          error,
        });
      });
  };
};
