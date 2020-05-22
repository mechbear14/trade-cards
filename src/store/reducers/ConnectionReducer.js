const initialState = {};

export const ConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIEW":
      return state;
    case "BACK":
      return state;
    default:
      return state;
  }
};
