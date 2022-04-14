import { useEffect, useState } from "react";
import { socket } from "..";

function Game() {
  //Set the state with next question when it comes
  useEffect(() => {
    socket.on("nextQuestion", (question) => {
      setQuestion(question);
    });
  }, []);

  const [question, setQuestion] = useState("");

  return (
    <div>
      <h1>Game Page</h1>
      <p>{question.question}</p>
    </div>
  );
}

export default Game;
