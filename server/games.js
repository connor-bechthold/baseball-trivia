const { v4: uuidv4 } = require("uuid");
const { getQuestions } = require("./questions");

module.exports = class Games {
  constructor() {
    this.games = [];
  }

  async createGame(hostId, difficulty, numberOfQuestions) {
    const gameId = uuidv4();
    const questions = await getQuestions(difficulty, numberOfQuestions);

    console.log(questions);

    const newGame = {
      gameId,
      hostId,
      questions,
      currentQuestion: null,
      numberOfPlayers: 1,
      playersAnswered: 0,
      started: false,
    };

    this.games.push(newGame);

    return newGame;
  }

  getGameById(gameId) {
    const game = this.games.find((x) => x.gameId === gameId);
    if (!game) {
      return null;
    }
    return game;
  }

  getCurrentQuestion(gameId) {
    const game = this.games.find((x) => x.gameId === gameId);
    if (game) {
      const currentQuestion = game.questions.shift();
      game.currentQuestion = currentQuestion;
      return currentQuestion;
    }
  }
};
