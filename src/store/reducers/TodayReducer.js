const initialState = {
  knowLoadCompleted: false,
  loadCompleted: false,
  respondCompleted: false,
  respondStarted: false,
  cardToday: null,
  connectionToday: null,
  todayLoadError: null,
  respondError: null,
};

export const TodayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TODAY_LOADED":
      return {
        ...state,
        todayLoadError: null,
        cardToday: action.cardToday,
        respondCompleted: action.responded,
        connectionToday: action.connectionToday,
        loadCompleted: true,
      };
    case "TODAY_LOAD_ERROR":
      return {
        ...state,
        loadCompleted: false,
        todayLoadError: action.error,
      };
    case "INVALID_RESPONSE":
      return {
        ...state,
        respondError: action.error,
      };
    case "RESPOND_STARTED": {
      return {
        ...state,
        respondStarted: true,
      };
    }
    case "RESPONDED":
      return {
        ...state,
        respondError: null,
        connectionToday: action.connectionToday,
        respondCompleted: true,
      };
    case "RESPOND_ERROR":
      return {
        ...state,
        respondError: action.error,
        respondStarted: false,
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
