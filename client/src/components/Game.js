import { useState } from "react";
import { connect } from "react-redux";
import { socket } from "..";
import { setScore } from "../actions/player";
import QuestionPreview from "./QuestionPreview";
import QuestionView from "./QuestionView";
import RoundEnd from "./RoundEnd";

const mapDispatchToProps = (dispatch) => {
  return {
    setScore: (score) => dispatch(setScore(score)),
  };
};

const mapStateToProps = (state) => {
  return {
    name: state.player.name,
    score: state.player.score,
  };
};

const Game = ({ name, score, setScore }) => {
  //Set the state with next question when it comes
  socket.on("nextQuestion", (question) => {
    setQuestion(question.question);
    setOptions(question.options);
    setGameState("questionPreview");
  });

  //If the server indicates that the round has ended
  socket.on("roundEnded", ({ playersData, correctAnswer, gameEnded }) => {
    //Get the current user
    const currentPlayer = playersData.find((x) => x.playerId === socket.id);

    //Sort the player data by score
    playersData.sort((a, b) => b.score - a.score);

    setIsCorrect(currentPlayer.correct);
    setScore(currentPlayer.score);
    setCorrectAnswer(correctAnswer);
    setLeaderboard(playersData);
    setGameEnded(gameEnded);
    setGameState("roundEnd");
  });

  //Game State
  const [gameState, setGameState] = useState("");
  const [gameEnded, setGameEnded] = useState(false);

  //Question Config
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

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
      {gameState === "roundEnd" && (
        <RoundEnd
          isCorrect={isCorrect}
          correctAnswer={correctAnswer}
          leaderboard={leaderboard}
          gameEnded={gameEnded}
        />
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
