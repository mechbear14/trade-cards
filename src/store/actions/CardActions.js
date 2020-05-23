import * as Firebase from "firebase/app";
import "firebase/firestore";

export const getCardToday = (userId) => {
  return (dispatch, getState) => {
    let userRef = null;
    let cardToday = null;
    let cardTodayRef = null;
    let completed = false;
    let newConnection = null;

    let userPromise = Firebase.firestore()
      .collection("users")
      .doc(userId)
      .get();
    let card2Promise = userPromise.then((userDoc) => {
      let cardPath = userDoc.data().card.path;
      if (cardPath) {
        return Firebase.firestore().doc(cardPath).get();
      } else {
        return new Promise((resolve, reject) => {
          reject({ cardToday: null });
        });
      }
    });
    let connectionPromise = Promise.all([userPromise, card2Promise]).then(
      ([userDoc, cardDoc]) => {
        userRef = userDoc.ref;
        cardTodayRef = cardDoc.ref;
        let { kind, text } = cardDoc.data();
        cardToday = { kind, text };
        return Firebase.firestore()
          .collection("connections")
          .where("card1", "==", cardDoc.ref)
          .where("addedBy", "==", userDoc.ref)
          .get();
      }
    );
    let card1Promise = connectionPromise.then((connectionDocs) => {
      completed = connectionDocs.docs.length > 0;
      if (completed) {
        let card1path = connectionDocs.docs[0].data().card1.path;
        return Firebase.firestore().doc(card1path).get();
      } else {
        return new Promise((resolve, reject) => {
          reject({ completed: false });
        });
      }
    });
    Promise.all([card1Promise, card2Promise])
      .then(([card1Doc, card2Doc]) => {
        dispatch({
          type: "GET_CARD",
          knowCompleted: true,
          cardToday,
          cardTodayRef,
          completed,
          newConnection: {
            card1: {
              kind: card1Doc.data().kind,
              text: card1Doc.data().text,
            },
            card2: {
              kind: card2Doc.data().kind,
              text: card2Doc.data().text,
            },
          },
        });
      })
      .catch((error) => {
        if (error.hasOwnProperty("completed") && !error.completed) {
          dispatch({
            type: "GET_CARD",
            knowCompleted: true,
            userRef,
            cardToday,
            cardTodayRef,
            completed,
            newConnection,
          });
        } else if (error.hasOwnProperty("cardToday") && !error.cardToday) {
          dispatch({
            type: "GET_CARD",
            knowCompleted: true,
            userRef,
            cardToday: null,
            cardTodayRef: null,
            completed,
            newConnection,
          });
        } else {
          dispatch({
            type: "GET_CARD_ERROR",
            error,
          });
        }
      });
  };
};

export const respond = (userId, card) => {
  return (dispatch, getState) => {
    let states = getState();
    console.log(states);
    let userRef = null;
    let card1Ref = states.card.cardTodayRef;
    let card2Ref = null;
    Firebase.firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((userDoc) => {
        userRef = userDoc.ref;
        return Firebase.firestore().collection("cards").add({
          kind: card.kind,
          text: card.text,
          addedBy: userRef,
          addedAt: new Date(),
          approved: false,
        });
      })
      .then((cardRef) => {
        card2Ref = cardRef;
        return Firebase.firestore().collection("connections").add({
          card1: card1Ref,
          card2: card2Ref,
          addedBy: userRef,
          addedAt: new Date(),
          approved: false,
        });
      })
      .then(() => {
        dispatch({
          type: "RESPOND",
          knowCompleted: true,
          completed: true,
          newConnection: {
            card1: states.card.cardToday,
            card2: card,
          },
          fetchCardError: null,
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

export const resetRespondError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "RESET_RESPOND_ERROR",
    });
  };
};
