const initialState = {
  loaded: false,
  connections: [],
  error: null,
};

export const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HISTORY_LOADED":
      return {
        ...state,
        loaded: true,
        connections: action.connections,
        error: null,
      };
    case "HISTORY_LOAD_ERROR":
      return {
        ...state,
        loaded: false,
        error: action.error,
      };
    case "HISTORY_MARKED_STALE":
      return {
        ...state,
        loaded: false,
      };
    case "LOGOUT":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
