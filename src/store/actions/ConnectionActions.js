import * as Firebase from "firebase/app";
import "firebase/firestore";

export const viewByCreator = () => {
  return (dispatch, getState) => {
    let userRef = getState().auth.loggedInUserRef;
    let connections = [];
    let connectionIds = [];
    let card1s = [];
    let card2s = [];

    Firebase.firestore()
      .collection("connections")
      .where("addedBy", "==", userRef)
      .orderBy("addedAt", "desc")
      .get()
      .then((connectionDocs) => {
        connectionIds = connectionDocs.docs.map((doc) => doc.id);
        card1s = connectionDocs.docs.map((doc) => doc.data().card1.get());
        card2s = connectionDocs.docs.map((doc) => doc.data().card2.get());
        return Promise.all([...card1s, ...card2s]);
      })
      .then((cards) => {
        let L = cards.length / 2;
        for (let i = 0; i < L; i++) {
          connections[i] = {
            id: connectionIds[i],
            card1: {
              id: cards[i].id,
              kind: cards[i].data().kind,
              text: cards[i].data().text,
            },
            card2: {
              id: cards[i + L].id,
              kind: cards[i + L].data().kind,
              text: cards[i + L].data().text,
            },
          };
        }
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
  return (dispatch, getState) => {
    let viewingCard = { id: "", kind: "", text: "" };
    let viewingCardRef = null;

    let connections = [];

    let cardRefPromise = Firebase.firestore()
      .collection("cards")
      .doc(cardId)
      .get()
      .then((cardDoc) => {
        viewingCard.id = cardDoc.id;
        viewingCardRef = cardDoc.ref;
        viewingCard.kind = cardDoc.data().kind;
        viewingCard.text = cardDoc.data().text;
        return new Promise((resolve, reject) => {
          resolve(cardDoc.ref);
        });
      });

    let conn1sPromise = cardRefPromise.then((cardRef) => {
      return Firebase.firestore()
        .collection("connections")
        .where("card1", "==", cardRef)
        .get();
    });

    let conn2sPromise = cardRefPromise.then((cardRef) => {
      return Firebase.firestore()
        .collection("connections")
        .where("card2", "==", cardRef)
        .get();
    });

    Promise.all([conn1sPromise, conn2sPromise])
      .then(([conn1s, conn2s]) => {
        let card1s = conn1s.docs.map((connDoc) => connDoc.data().card2.get());
        let card2s = conn2s.docs.map((connDoc) => connDoc.data().card1.get());
        let cardPromises = [...card1s, ...card2s];
        return Promise.all(cardPromises);
      })
      .then((cardDocs) => {
        connections = cardDocs.map((cardDoc) => {
          return {
            card: {
              id: cardDoc.id,
              ref: cardDoc.ref,
              kind: cardDoc.data().kind,
              text: cardDoc.data().text,
            },
            count: 1,
          };
        });
        dispatch({
          type: "VIEW_BY_CARD",
          card: viewingCard,
          cardRef: viewingCardRef,
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
