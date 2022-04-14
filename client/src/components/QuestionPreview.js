import { useEffect, useState } from "react";

const QuestionPreview = ({ question, setGameState }) => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setGameState("questionView");
    }
  });

  return (
    <div>
      <h1>THIS IS THE QUESTION PREVIEW</h1>
      <h1>{seconds}</h1>
      <p>{question}</p>
    </div>
  );
};

export default QuestionPreview;
