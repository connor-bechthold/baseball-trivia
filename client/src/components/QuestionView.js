import { Button } from "@mui/material";
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
      setTimeout(() => setSeconds(seconds - 1), 1000);
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

  const [seconds, setSeconds] = useState(20);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  return (
    <div>
      {!questionAnswered ? (
        <div>
          <h1>{seconds}</h1>
          <h1>{question}</h1>
          {options.map((option) => {
            return (
              <Button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  display: "block",
                }}
                onClick={submitAnswer}
                value={option}
              >
                {option}
              </Button>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>Answer Submitted</h1>
          <p>Waiting for other players to submit...</p>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(QuestionView);
