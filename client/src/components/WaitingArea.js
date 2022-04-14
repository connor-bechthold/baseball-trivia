import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "..";

const mapStateToProps = (state) => {
  return {
    type: state.player.type,
    gameId: state.game.gameId,
  };
};

const WaitingArea = ({ gameId, type }) => {
  //Navigation
  const navigate = useNavigate();

  //Player state
  const [players, setPlayers] = useState([]);

  //Get the initial player data on component mount
  useEffect(() => {
    socket.emit("getPlayersData", { gameId });
  }, [gameId]);

  //If a new player joins, update state
  socket.on("playersData", (players) => {
    setPlayers(players);
  });

  //Host has initiated the game to start
  socket.on("hostStartedGame", () => {
    navigate("/game");
  });

  const startGame = () => {
    socket.emit("startGame");
  };

  return (
    <div>
      {type === "HOST" && <h1>{`Game Code: ${gameId}`}</h1>}
      <h1>Players</h1>
      {players.map((player) => {
        return <p key={player.playerId}>{player.name}</p>;
      })}
      {type === "HOST" && (
        <Button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={startGame}
        >
          Start Game
        </Button>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(WaitingArea);
