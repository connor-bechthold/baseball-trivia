export const setGameId = (gameId) => {
  return {
    type: "SET_GAME_ID",
    gameId,
  };
};

export const setCurrentQuestion = (currentQuestion) => {
  return {
    type: "SET_CURRENT_QUESTION",
    currentQuestion,
  };
};

export const setTotalQuestions = (totalQuestions) => {
  return {
    type: "SET_TOTAL_QUESTIONS",
    totalQuestions,
  };
};

export const resetGame = () => {
  return {
    type: "RESET_GAME",
  };
};
