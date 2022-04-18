import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const QuestionPreview = ({ question, setGameState }) => {
  const [seconds, setSeconds] = useState(100);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 25), 1000);
    } else {
      setGameState("questionView");
    }
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="40vh"
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
      </Box>
    </Box>
  );
};

export default QuestionPreview;
