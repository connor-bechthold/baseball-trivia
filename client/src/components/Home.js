import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
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

  useEffect(() => {
    //If the host disconnects, reset store and go back to this page
    socket.on("hostDisconnected", () => {
      navigate("/");
      resetPlayer();
      resetGame();
    });
  }, [navigate, resetGame, resetPlayer]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box sx={{ height: "50vh", textAlign: "center" }}>
        <Typography variant="h3">Welcome To Sprivia!</Typography>
        <Typography variant="body2">(A sports based trivia game)</Typography>
        <Typography variant="h6">
          Start a new game or join a game to get started
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="80px"
          style={{ marginTop: "20px" }}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={toCreateGame}
          >
            Create Game
          </Button>
          <Button variant="contained" size="large" onClick={toJoinGame}>
            Join Game
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(Home);
