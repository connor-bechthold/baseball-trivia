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

//Global error modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid red",
  boxShadow: 24,
  p: 4,
};

function Home() {
  //General Errors
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorClose = () => {
    setError(false);
    setErrorMessage("");
  };

  //Create Game Section
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

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
    if (Number.isNaN(numberOfQuestions)) {
      setError(true);
      setErrorMessage("Invalid number of questions entered.");
    }
  };

  return (
    <div>
      <div>
        <h1>Create Game</h1>
        <FormControl fullWidth>
          <p>Select A Difficulty</p>
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

          <p>Select A Number Of Questions</p>
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
        <Box sx={modalStyle}>
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
