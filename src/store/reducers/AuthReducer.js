const initialState = {
  knowAuthInfo: false,
  loggedInUser: null,
  registeredUser: null,
  registerError: null,
  loginError: null,
  logoutError: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        registeredUser: action.newUser,
        registerError: null,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        registeredUser: null,
        registerError: action.error,
      };
    case "RESET_REGISTER_ERROR":
      return {
        ...state,
        registeredUser: null,
        registerError: null,
      };
    case "LOGIN":
      return {
        ...state,
        loggedInUser: action.loggedInUser,
        loginError: null,
      };
    case "LOGIN_ERROR":
      console.log(action);
      return {
        ...state,
        loggedInUser: null,
        loginError: action.error,
      };
    case "RESET_LOGIN_ERROR":
      return {
        ...state,
        loginError: null,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedInUser: null,
      };
    case "LOGOUT_ERROR":
      return {
        ...state,
        logoutError: action.error,
      };
    case "RECOVER":
      return state;
    case "OPEN_APP":
      return {
        ...state,
        knowAuthInfo: true,
        loggedInUser: action.user,
      };
    default:
      return state;
  }
};
