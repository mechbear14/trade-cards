const initialState = {};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        newUser: action.newUser,
        error: null,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        newUser: null,
        error: action.error,
      };
    case "RESET_REGISTER_ERRORS":
      return {
        ...state,
        newUser: null,
        error: null,
      };
    case "LOGIN":
      return state;
    case "LOGOUT":
      return state;
    case "RECOVER":
      return state;
    default:
      return state;
  }
};
