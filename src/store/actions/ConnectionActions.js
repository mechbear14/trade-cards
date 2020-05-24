import * as Firebase from "firebase/app";
import "firebase/firestore";

export const viewByCreator = () => {
  return (dispatch, getState) => {
    let userRef = getState().auth.loggedInUserRef;
    let connections = [];
    Firebase.firestore()
      .collection("connections")
      .where("addedBy", "==", userRef)
      .orderBy("addedAt", "desc")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        connections = querySnapshot.docs.map((query) => {
          let card1 = query.data().card1.get();
          let card2 = query.data().card2.get();
          Promise.all([card1, card2])
            .then(([card1Doc, card2Doc]) => {
              return {
                card1: {
                  id: card1Doc.id,
                  kind: card1Doc.data().kind,
                  text: card1Doc.data().text,
                },
                card2: {
                  id: card2Doc.id,
                  kind: card2Doc.data().kind,
                  text: card2Doc.data().text,
                },
              };
            })
            .catch((error) => {
              return error;
            });
        });
        console.log(connections);
      })
      .then(() => {
        dispatch({
          type: "VIEW_BY_CREATOR",
          connections,
        });
      })
      .catch((error) => {
        dispatch({
          type: "VIEW_ERROR",
          error,
        });
      });
  };
};

export const viewByCard = (cardId) => {
  return (dispatch, getState) => {};
};
