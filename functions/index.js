const functions = require("firebase-functions");

const Firebase = require("firebase-admin");
Firebase.initializeApp();

exports.getTodayByUser = functions.https.onCall(async (data, context) => {
  if (data.userId !== context.auth.uid) {
    await Firebase.auth().signOut();
    throw new Error("Your login session has expired. Please refresh the page.");
  } else {
    let userRef = Firebase.firestore()
      .collection("users")
      .doc(context.auth.uid);
    let response = {
      cardToday: null,
      responded: false,
      connectionToday: null,
    };

    let cardTodayRef = (await userRef.get()).data().card; // 1 database read
    if (cardTodayRef) {
      let cardToday = await cardTodayRef.get(); // 2 database reads
      response.cardToday = {
        id: cardTodayRef.id,
        kind: cardToday.data().kind,
        text: cardToday.data().text,
      };
      let connectionToday = await Firebase.firestore()
        .collection("connections")
        .where("addedBy", "==", userRef)
        .where("card1", "==", cardTodayRef)
        .get(); // 3 database reads
      if (connectionToday.docs.length > 0) {
        let connectionDoc = connectionToday.docs[0];
        let card2 = await connectionDoc.data().card2.get(); // 4 database reads
        response.responded = true;
        response.connectionToday = {
          id: connectionToday.docs[0].ref.id,
          card1: {
            id: cardToday.ref.id,
            kind: cardToday.data().kind,
            text: cardToday.data().text,
          },
          card2: {
            id: card2.ref.id,
            kind: card2.data().kind,
            text: card2.data().text,
          },
        };
      } else {
        response.responded = false;
        response.connectionToday = null;
      }
    }
    return response;
  }
});

exports.respondWithCard = functions.https.onCall(async (data, context) => {
  if (data.userId !== context.auth.uid) {
    await Firebase.auth().signOut();
    throw new Error("Your login session has expired. Please refresh the page.");
  } else {
    let userRef = Firebase.firestore()
      .collection("users")
      .doc(context.auth.uid);
    let card1Ref = Firebase.firestore().collection("cards").doc(data.card1Id);
    let card2Ref = await Firebase.firestore().collection("cards").add({
      kind: data.card2.kind,
      text: data.card2.text,
      addedBy: userRef,
      addedAt: new Date(),
      approved: false,
    }); // 1 database write
    let connectionRef = await Firebase.firestore()
      .collection("connections")
      .add({
        card1: card1Ref,
        card2: card2Ref,
        addedBy: userRef,
        addedAt: new Date(),
        approved: false,
        count: 1,
      }); // 2 database writes
    return {
      card2Id: card2Ref.id,
      connectionId: connectionRef.id,
    };
  }
});

exports.getHistoryByUser = functions.https.onCall(async (data, context) => {
  if (data.userId !== context.auth.uid) {
    await Firebase.auth().signOut();
    throw new Error("Your login session has expired. Please refresh the page.");
  } else {
    let userRef = Firebase.firestore()
      .collection("users")
      .doc(context.auth.uid);
    let connectionDocs = await Firebase.firestore()
      .collection("connections")
      .where("addedBy", "==", userRef)
      .orderBy("addedAt", "desc")
      .get(); // 1 database read
    let card1Docs = await Promise.all(
      connectionDocs.docs.map(
        async (connection) => await connection.data().card1.get()
      )
    );
    let card2Docs = await Promise.all(
      connectionDocs.docs.map(
        async (connection) => await connection.data().card2.get()
      )
    );
    let connections = connectionDocs.docs.map((connectionDoc, index) => {
      return {
        id: connectionDoc.id,
        card1: {
          id: card1Docs[index].ref.id,
          kind: card1Docs[index].data().kind,
          text: card1Docs[index].data().text,
        },
        card2: {
          id: card2Docs[index].ref.id,
          kind: card2Docs[index].data().kind,
          text: card2Docs[index].data().text,
        },
      };
    });
    return { connections };
  }
});

exports.getConnectionsByCard = functions.https.onCall(async (data, context) => {
  let cardRef = Firebase.firestore().collection("cards").doc(data.cardId);
  let connectionsByCard1 = await Firebase.firestore()
    .collection("connections")
    .where("card1", "==", cardRef)
    .get(); // 1 database read
  let connectionsByCard2 = await Firebase.firestore()
    .collection("connections")
    .where("card2", "==", cardRef)
    .get(); // 2 database reads
  let otherCardsByCard1 = connectionsByCard1.docs.map((connectionDoc) => {
    return {
      otherCard: connectionDoc.data().card2,
      count: connectionDoc.data().count,
    };
  });
  let otherCardsByCard2 = connectionsByCard2.docs.map((connectionDoc) => {
    return {
      otherCard: connectionDoc.data().card1,
      count: connectionDoc.data().count,
    };
  });
  let cardRefsWithCount = [...otherCardsByCard1, ...otherCardsByCard2].sort(
    (cardA, cardB) => cardB.count - cardA.count
  );
  let cardDocsWithoutCount = await Promise.all(
    cardRefsWithCount.map(async (cardWithCount) => {
      return await cardWithCount.otherCard.get(); // 2 + N database reads
    })
  );
  let cardsWithCount = cardRefsWithCount.map((cardRefWithCount, index) => {
    return {
      card: {
        id: cardRefWithCount.otherCard.id,
        kind: cardDocsWithoutCount[index].data().kind,
        text: cardDocsWithoutCount[index].data().text,
      },
      count: cardRefWithCount.count,
    };
  });

  return { cardsWithCount };
});
