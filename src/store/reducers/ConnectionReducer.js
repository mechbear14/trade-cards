const initialState = {
  knowConnections: false,
  viewingCard: null,
  viewingCardRef: null,
  connections: [],
  connectionsWithCount: [],
  viewError: null,
};

export const ConnectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIEW_BY_CREATOR":
      console.log(state);
      return {
        ...state,
        knowConnections: true,
        viewingCard: null,
        viewingCardRef: null,
        connections: action.connections,
        connectionsWithCount: [],
        viewError: null,
      };
    case "VIEW_BY_CARD":
      console.log(action);
      return {
        ...state,
        knowConnections: true,
        viewingCard: action.card,
        viewingCardRef: action.cardRef,
        connections: [],
        connectionsWithCount: action.connections,
        viewError: null,
      };
    case "VIEW_ERROR":
      console.log(action);
      return {
        ...state,
        knowConnections: false,
        viewError: action.error,
      };
    default:
      return state;
  }
};
