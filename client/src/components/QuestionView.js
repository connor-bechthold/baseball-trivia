import {
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { socket } from "..";

const mapStateToProps = (state) => {
  return {
    type: state.player.type,
  };
};

const QuestionView = ({ question, options, type }) => {
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 4), 1000);
    } else {
      //If the timer reaches zero, some players haven't answered
      //So, the HOST will emit to the server and update the game state
      if (type === "HOST") {
        socket.emit("timerEnded");
      }
    }
  });

  const submitAnswer = (event) => {
    socket.emit("submitAnswer", event.target.value, seconds);
    setQuestionAnswered(true);
  };

  const [seconds, setSeconds] = useState(100);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  return (
    <div>
      {!questionAnswered ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="85vh"
        >
          <Box sx={{ width: "80%", textAlign: "center" }}>
            <LinearProgress
              variant="determinate"
              value={seconds}
              sx={{ width: "100%" }}
            />
            <Typography variant="h4" sx={{ marginTop: "50px" }}>
              {question}
            </Typography>
            <Grid
              container
              rowSpacing={2}
              sx={{
                margin: "50px auto 0",
              }}
            >
              {options.map((option) => {
                return (
                  <Grid item xs={6} key={option} align="center">
                    <Button
                      variant="contained"
                      onClick={submitAnswer}
                      value={option}
                      style={{
                        width: "28em",
                        height: "7em",
                        fontSize: "20px",
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      {option}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <Box sx={{ width: "80%", textAlign: "center" }}>
            <Typography variant="h4">
              Waiting for other players to submit...
            </Typography>
            <CircularProgress sx={{ marginTop: "25px" }} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(QuestionView);
