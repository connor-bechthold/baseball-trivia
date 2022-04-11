import { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { errorModalStyle } from "../styles/modal";
import { socket } from "..";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setHost, setName } from "../actions/player";
import { setGameId } from "../actions/game";

const mapDispatchToProps = (dispatch) => {
  return {
    setHost: () => dispatch(setHost()),
    setName: (name) => dispatch(setName(name)),
    setGameId: (gameId) => dispatch(setGameId(gameId)),
  };
};

const CreateGame = (props) => {
  //Navigation
  const navigate = useNavigate();

  //General Errors
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorClose = () => {
    setError(false);
    setErrorMessage("");
  };

  //Create Game Functionality
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleNumberOfQuestionsChange = (event) => {
    let value = parseInt(event.target.value, 10);
    if (value > 20) {
      value = 20;
    }
    if (value < 1) {
      value = 1;
    }
    setNumberOfQuestions(value);
  };

  const createGame = () => {
    if (Number.isNaN(numberOfQuestions) || !name) {
      setError(true);
      setErrorMessage(
        "Please fill out all required fields before creating a game"
      );
    } else {
      const data = {
        name,
        difficulty,
        numberOfQuestions,
      };
      socket.emit("createGame", data, (gameId) => {
        props.setHost();
        props.setName(name);
        props.setGameId(gameId);
        navigate("/waiting");
      });
    }
  };

  return (
    <div>
      <div>
        <h1>Create Game</h1>
        <FormControl fullWidth>
          <p>Name</p>
          <TextField
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <p>Difficulty</p>
          <Select value={difficulty} onChange={handleDifficultyChange}>
            <MenuItem value="">Any</MenuItem>
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>

          <p>Number Of Questions</p>
          <TextField
            type="number"
            value={numberOfQuestions}
            onChange={handleNumberOfQuestionsChange}
            InputLabelProps={{
              min: 1,
              max: 20,
            }}
          />
        </FormControl>
        <Button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={createGame}
        >
          Create Game
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

export default connect(null, mapDispatchToProps)(CreateGame);
