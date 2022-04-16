module.exports = class Players {
  constructor() {
    this.players = [];
  }

  createPlayer(playerId, gameId, name) {
    const newPlayer = {
      playerId,
      gameId,
      name,
      correct: false,
      score: 0,
    };

    this.players.push(newPlayer);

    return newPlayer;
  }

  getPlayerById(playerId) {
    const player = this.players.find((x) => x.playerId === playerId);
    if (!player) {
      return null;
    }
    return player;
  }

  getPlayersByGameId(gameId) {
    return this.players.filter((x) => x.gameId === gameId);
  }

  deletePlayerById(playerId) {
    console.log("BEFORE", this.players);
    const playerIndex = this.players.findIndex((x) => x.playerId === playerId);
    if (playerIndex !== -1) {
      this.players.splice(playerIndex, 1);
    }
    console.log("AFTER", this.players);
  }

  deletePlayersByGame(gameId) {
    console.log("before", this.players);
    const playersToDelete = this.players.filter((x) => x.gameId === gameId);
    for (let i = 0; i < playersToDelete.length; i++) {
      const player = playersToDelete[i];
      const playerIndex = this.players.indexOf(player);

      if (playerIndex !== -1) {
        this.players.splice(playerIndex, 1);
      }
    }
    console.log("after", this.players);
  }
};
