import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { socket } from "..";
import QuestionPreview from "./QuestionPreview";
import QuestionView from "./QuestionView";

const mapStateToProps = (state) => {
  return {
    name: state.player.name,
  };
};

const Game = ({ name }) => {
  //Set the state with next question when it comes
  useEffect(() => {
    socket.on("nextQuestion", (question) => {
      setQuestion(question.question);
      setOptions(question.options);
    });
  }, []);

  const [gameState, setGameState] = useState("questionPreview");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>{`User: ${name}`}</h1>
      <h1>{`Score: ${score}`}</h1>
      {gameState === "questionPreview" && (
        <QuestionPreview question={question} setGameState={setGameState} />
      )}
      {gameState === "questionView" && (
        <QuestionView question={question} options={options} />
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Game);
