import { Button } from "@mui/material";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "..";
import { resetGame } from "../actions/game";
import { resetPlayer } from "../actions/player";
import Leaderboard from "./Leaderboard";

const mapStateToProps = (state) => {
  return {
    type: state.player.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPlayer: () => dispatch(resetPlayer()),
    resetGame: () => dispatch(resetGame()),
  };
};

const RoundEnd = ({
  isCorrect,
  correctAnswer,
  leaderboard,
  type,
  gameEnded,
  resetPlayer,
  resetGame,
}) => {
  const getNextQuestion = () => {
    socket.emit("getNextQuestion");
  };

  const finishGame = () => {
    if (type === "HOST") {
      socket.emit("hostLeft");
    } else if (type === "PLAYER") {
      socket.emit("playerLeft");
      resetPlayer();
      resetGame();
      navigate("/");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      {isCorrect ? (
        <h1 style={{ color: "green" }}>Your Answer Is Correct!</h1>
      ) : (
        <h1
          style={{ color: "red" }}
        >{`Incorrect! The correct answer was: ${correctAnswer}`}</h1>
      )}
      {gameEnded && <h1>Game Over!</h1>}
      <Leaderboard leaderboard={leaderboard} />
      {type === "HOST" && !gameEnded && (
        <Button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={getNextQuestion}
        >
          Next Question
        </Button>
      )}
      {gameEnded && (
        <Button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={finishGame}
        >
          Home
        </Button>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundEnd);
