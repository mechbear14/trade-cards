const initialState = {
  knowCompleted: false,
  cardToday: null,
  cardTodayRef: null,
  completed: null,
  fetchCardError: null,
  respondError: null,
  newConnection: null,
};

export const CardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CARD":
      console.log(action);
      return {
        ...state,
        knowCompleted: true,
        cardToday: action.cardToday,
        cardTodayRef: action.cardTodayRef,
        completed: action.completed,
        newConnection: action.newConnection,
        fetchCardError: null,
      };
    case "GET_CARD_ERROR": {
      return {
        ...state,
        fetchCardError: action.error,
      };
    }
    case "RESPOND":
      console.log(action);
      return {
        ...state,
        knowCompleted: action.knowCompleted,
        completed: action.completed,
        newConnection: action.newConnection,
        fetchCardError: null,
      };
    case "RESPOND_ERROR":
      console.log(action);
      return {
        ...state,
        respondError: action.error,
      };
    case "RESET_RESPOND_ERROR":
      return {
        ...state,
        respondError: null,
      };
    default:
      return state;
  }
};
