const initialState = {
  viewingCard: null,
  loaded: false,
  connectedCards: [],
  error: null,
};

export const ViewReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "START_FETCH":
      return {
        ...state,
        loaded: false,
        viewingCard: action.card,
      };
    case "CONNECTIONS_FETCHED":
      return {
        ...state,
        connectedCards: action.connections,
        loaded: true,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loaded: true,
        error: action.error,
      };
    case "RESET_VIEWING":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
