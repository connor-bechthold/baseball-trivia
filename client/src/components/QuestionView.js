import { Button } from "@mui/material";

const QuestionView = ({ question, options }) => {
  const submitAnswer = (event) => {
    console.log(event.target.value);
  };
  return (
    <div>
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
  );
};

export default QuestionView;
