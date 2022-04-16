export const setGameId = (gameId) => {
  return {
    type: "SET_GAME_ID",
    gameId,
  };
};

export const resetGame = () => {
  return {
    type: "RESET_GAME",
  };
};
