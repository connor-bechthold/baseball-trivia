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
import { setGameId, setTotalQuestions } from "../actions/game";
import { Test } from "../styles/textField";

const mapDispatchToProps = (dispatch) => {
  return {
    setHost: () => dispatch(setHost()),
    setName: (name) => dispatch(setName(name)),
    setTotalQuestions: (totalQuestions) =>
      dispatch(setTotalQuestions(totalQuestions)),
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
        props.setTotalQuestions(numberOfQuestions);
        props.setGameId(gameId);
        navigate("/waiting");
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
        {" "}
        <FormControl fullWidth>
          <Typography variant="h6">Name</Typography>{" "}
          <Test
            autoComplete="off"
            value={name}
            onChange={handleNameChange}
            sx={{ input: { color: "white" } }}
          />
          <Typography variant="h6">Difficulty</Typography>
          <Select
            value={difficulty}
            onChange={handleDifficultyChange}
            sx={{ color: "white" }}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
          <Typography variant="h6">Number Of Questions</Typography>
          <TextField
            type="number"
            autoComplete="off"
            value={numberOfQuestions}
            onChange={handleNumberOfQuestionsChange}
            sx={{ input: { color: "white" } }}
            InputLabelProps={{
              min: 1,
              max: 20,
            }}
          />
        </FormControl>
        <Box sx={{ textAlign: "center", marginTop: "25px" }}>
          <Button onClick={createGame} size="large" variant="contained">
            Create Game
          </Button>
        </Box>
      </Box>

      <Modal open={error} onClose={handleErrorClose}>
        <Box sx={errorModalStyle}>
          <Typography variant="h6" color="red" fontWeight="bold">
            Error
          </Typography>
          <Typography sx={{ mt: 2 }}>{errorMessage}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(CreateGame);
