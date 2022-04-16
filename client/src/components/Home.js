import { Button } from "@mui/material";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "..";
import { resetGame } from "../actions/game";
import { resetPlayer } from "../actions/player";

const mapDispatchToProps = (dispatch) => {
  return {
    resetPlayer: () => dispatch(resetPlayer()),
    resetGame: () => dispatch(resetGame()),
  };
};

const Home = ({ resetGame, resetPlayer }) => {
  //Navigation
  const navigate = useNavigate();

  //Home functionality
  const toCreateGame = () => {
    navigate("/create");
  };

  const toJoinGame = () => {
    navigate("/join");
  };

  //If the host disconnects, reset store and go back to this page
  socket.on("hostDisconnected", () => {
    navigate("/");
    resetPlayer();
    resetGame();
  });

  return (
    <div>
      <h1>Welcome To Sports Trivia!</h1>
      <Button
        style={{ backgroundColor: "green", color: "white" }}
        onClick={toCreateGame}
      >
        Create Game
      </Button>
      <Button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={toJoinGame}
      >
        Join Game
      </Button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Home);
