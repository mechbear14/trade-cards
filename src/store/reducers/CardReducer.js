const initialState = {
  completed: false,
};

export const CardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESPOND":
      return state;
    default:
      return state;
  }
};
