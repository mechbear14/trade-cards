const initialState = { error: null, newUser: null, loggedInUser: null };

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
      return {
        ...state,
        loggedInUser: action.loggedInUser,
        error: null,
      };
    case "LOGIN_ERROR":
      console.log(action);
      return {
        ...state,
        loggedInUser: null,
        error: action.error,
      };
    case "RESET_LOGIN_ERRORS":
      return {
        ...state,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedInUser: null,
      };
    case "LOGOUT_ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "RECOVER":
      return state;
    case "OPEN_APP":
      console.log(action.user);
      return {
        ...state,
        loggedInUser: action.user,
      };
    default:
      return state;
  }
};
