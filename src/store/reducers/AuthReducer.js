const initialState = {
  knowAuthInfo: false,
  requestStarted: false,
  loggedInUser: null,
  loggedInUserRef: null,
  registeredUser: null,
  registerError: null,
  loginError: null,
  logoutError: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_STARTED":
      return {
        ...state,
        requestStarted: true,
      };
    case "REGISTER":
      return {
        ...state,
        registeredUser: action.newUser,
        registerError: null,
        requestStarted: false,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        registeredUser: null,
        registerError: action.error,
        requestStarted: false,
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
        requestStarted: false,
        loggedInUser: action.loggedInUser,
        loggedInUserRef: action.loggedInUserRef,
        loginError: null,
      };
    case "LOGIN_ERROR":
      console.log(action);
      return {
        ...state,
        requestStarted: false,
        loggedInUser: null,
        loggedInUserRef: null,
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
        loggedInUserRef: null,
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
        loggedInUserRef: action.userRef,
      };
    default:
      return state;
  }
};
