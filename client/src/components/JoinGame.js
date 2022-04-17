import { useState } from "react";
import {
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
} from "@mui/material";
import { errorModalStyle } from "../styles/modal";
import { socket } from "..";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setName, setPlayer } from "../actions/player";
import { setGameId, setTotalQuestions } from "../actions/game";

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayer: () => dispatch(setPlayer()),
    setName: (name) => dispatch(setName(name)),
    setTotalQuestions: (totalQuestions) =>
      dispatch(setTotalQuestions(totalQuestions)),
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
          props.setName(name);
          props.setTotalQuestions(res.totalQuestions);
          props.setGameId(gameId);
          navigate("/waiting");
        }
      });
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box sx={{ height: "80vh", width: "40%" }}>
        <FormControl fullWidth>
          <Typography variant="h6">Game Code</Typography>
          <TextField
            sx={{ input: { color: "white" } }}
            autoComplete="off"
            value={gameId}
            onChange={handleGameIdChange}
          />
          <Typography variant="h6">Player Name</Typography>
          <TextField
            autoComplete="off"
            sx={{ input: { color: "white" } }}
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>
        <Box sx={{ textAlign: "center", marginTop: "25px" }}>
          <Button onClick={joinGame} variant="contained" size="large">
            Join Game
          </Button>
        </Box>
      </Box>

      <Modal open={error} onClose={handleErrorClose}>
        <Box sx={errorModalStyle}>
          <Typography variant="h6" component="h2" color="red" fontWeight="bold">
            Error
          </Typography>
          <Typography sx={{ mt: 2 }}>{errorMessage}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(JoinGame);
