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

function Home() {
  //General Errors
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorClose = () => {
    setError(false);
    setErrorMessage("");
  };

  //Create Game Section
  const [playerName, setPlayerName] = useState("");
  const [gameName, setGameName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
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
    if (Number.isNaN(numberOfQuestions) || !playerName || !gameName) {
      setError(true);
      setErrorMessage(
        "Please fill out all required fields before creating a game"
      );
    } else {
      const data = {
        playerName,
        gameName,
        difficulty,
        numberOfQuestions,
      };
      socket.emit("createGame", data, (res) => {
        if (res.status === "Error") {
          setError(true);
          setErrorMessage(res.message);
        } else {
          console.log(res);
        }
      });
    }
  };

  return (
    <div>
      <div>
        <h1>Create Game</h1>
        <FormControl fullWidth>
          <p>Player Name</p>
          <TextField
            displayEmpty
            variant="outlined"
            value={playerName}
            onChange={handlePlayerNameChange}
          />
          <p>Game Name</p>
          <TextField
            displayEmpty
            variant="outlined"
            value={gameName}
            onChange={handleGameNameChange}
          />
          <p>Difficulty</p>
          <Select
            value={difficulty}
            onChange={handleDifficultyChange}
            displayEmpty
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>

          <p>Number Of Questions</p>
          <TextField
            displayEmpty
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

      <div>
        <h1>Join Game</h1>
        <h1>{numberOfQuestions}</h1>
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
}

export default Home;
