import { useState } from "react";
import { TextField, Button, Modal, Box, Typography } from "@mui/material";
import { errorModalStyle } from "../styles/modal";
import { socket } from "..";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setPlayer } from "../actions/player";
import { setGameId } from "../actions/game";

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayer: () => dispatch(setPlayer()),
    setGameId: (gameId) => dispatch(setGameId(gameId)),
  };
};

const JoinGame = (props) => {
  //Navigation
  const navigate = useNavigate();

  //General Errors
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorClose = () => {
    setError(false);
    setErrorMessage("");
  };

  //Join Game Functionality
  const [gameId, setGameId] = useState("");
  const [name, setName] = useState("");

  const handleGameIdChange = (event) => {
    setGameId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const joinGame = () => {
    if (!gameId || !name) {
      setError(true);
      setErrorMessage(
        "Please fill out all required fields before creating a game"
      );
    } else {
      const data = {
        gameId,
        name,
      };
      socket.emit("joinGame", data, (res) => {
        if (res.status === "Error") {
          setError(true);
          setErrorMessage(res.message);
        } else {
          props.setPlayer();
          props.setGameId(gameId);
          navigate("/waiting");
        }
      });
    }
  };
  return (
    <div>
      <div>
        <h1>Join Game</h1>
        <p>Game Name</p>
        <TextField
          variant="outlined"
          value={gameId}
          onChange={handleGameIdChange}
        />
        <p>Player Name</p>
        <TextField
          displayEmpty
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <Button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={joinGame}
        >
          Join Game
        </Button>
      </div>

      <Modal open={error} onClose={handleErrorClose}>
        <Box sx={errorModalStyle}>
          <Typography variant="h6" component="h2" color="red" fontWeight="bold">
            Error
          </Typography>
          <Typography sx={{ mt: 2 }}>{errorMessage}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(JoinGame);
