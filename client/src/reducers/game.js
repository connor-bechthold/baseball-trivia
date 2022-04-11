const defaultGame = {
  gameId: "",
};

const gameReducer = (state = defaultGame, action) => {
  switch (action.type) {
    case "SET_GAME_ID":
      return {
        ...state,
        gameId: action.gameId,
      };
    default:
      return state;
  }
};

export default gameReducer;
