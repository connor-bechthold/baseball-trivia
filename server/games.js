const { v4: uuidv4 } = require("uuid");
const { getQuestions } = require("./questions");

module.exports = class Games {
  constructor() {
    this.games = [];
  }

  async createGame(hostId, difficulty, numberOfQuestions) {
    const gameId = uuidv4();
    const questions = await getQuestions(difficulty, numberOfQuestions);

    //Decode questions from URI format
    const decodedQuestions = questions.map((q) => {
      const incorrectAnswers = q.incorrect_answers.map((i) => {
        return decodeURIComponent(i);
      });

      return {
        ...q,
        question: decodeURIComponent(q.question),
        correct_answer: decodeURIComponent(q.correct_answer),
        incorrect_answers: incorrectAnswers,
      };
    });

    const newGame = {
      gameId,
      hostId,
      questions: decodedQuestions,
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

  getGameByHostId(hostId) {
    const game = this.games.find((x) => x.hostId === hostId);
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

  decrementNumberOfPlayers(gameId) {
    const game = this.games.find((x) => x.gameId === gameId);
    if (game) {
      game.numberOfPlayers -= 1;
    }
  }

  deleteGameById(gameId) {
    const gameIndex = this.games.findIndex((x) => x.gameId === gameId);
    if (gameIndex !== -1) {
      this.games.splice(gameIndex, 1);
    }
  }
};
