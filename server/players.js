module.exports = class Players {
  constructor() {
    this.players = [];
  }

  createPlayer(playerId, gameId, name) {
    const newPlayer = {
      playerId,
      gameId,
      name,
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
    return this.players
      .filter((x) => x.gameId === gameId)
      .map((x) => {
        return {
          playerId: x.playerId,
          name: x.name,
        };
      });
  }
};
