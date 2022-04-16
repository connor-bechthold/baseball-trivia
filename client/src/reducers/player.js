const defaultPlayer = {
  type: "",
  name: "",
  score: 0,
};

const playerReducer = (state = defaultPlayer, action) => {
  switch (action.type) {
    case "SET_HOST":
      return {
        ...state,
        type: "HOST",
      };
    case "SET_PLAYER":
      return {
        ...state,
        type: "PLAYER",
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "SET_SCORE":
      return {
        ...state,
        score: action.score,
      };
    case "RESET_PLAYER":
      return defaultPlayer;
    default:
      return state;
  }
};

export default playerReducer;
