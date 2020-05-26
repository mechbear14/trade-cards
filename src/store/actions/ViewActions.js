import * as Firebase from "firebase/app";
import "firebase/functions";

export const viewConnection = (card) => {
  return (dispatch, getState) => {
    dispatch({
      type: "START_FETCH",
      card,
    });
    let getConnectionsByCard = Firebase.functions().httpsCallable(
      "getConnectionsByCard"
    );
    getConnectionsByCard({ cardId: card.id })
      .then((cardsWithCount) => {
        dispatch({
          type: "CONNECTIONS_FETCHED",
          connections: cardsWithCount.data.cardsWithCount,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_ERROR",
          error,
        });
      });
  };
};

export const resetViewing = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "RESET_VIEWING",
    });
  };
};
