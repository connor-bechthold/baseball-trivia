const defaultGame = {
  gameId: "",
  currentQuestion: 0,
  totalQuestions: 0,
};

const gameReducer = (state = defaultGame, action) => {
  switch (action.type) {
    case "SET_GAME_ID":
      return {
        ...state,
        gameId: action.gameId,
      };
    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestion: action.currentQuestion,
      };
    case "SET_TOTAL_QUESTIONS":
      return {
        ...state,
        totalQuestions: action.totalQuestions,
      };

    case "RESET_GAME":
      return defaultGame;
    default:
      return state;
  }
};

export default gameReducer;
