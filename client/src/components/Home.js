import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //Navigation
  const navigate = useNavigate();

  //Home functionality
  const toCreateGame = () => {
    navigate("/create");
  };

  const toJoinGame = () => {
    navigate("/join");
  };
  return (
    <div>
      <h1>Welcome To Sports Trivia!</h1>
      <Button
        style={{ backgroundColor: "green", color: "white" }}
        onClick={toCreateGame}
      >
        Create Game
      </Button>
      <Button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={toJoinGame}
      >
        Join Game
      </Button>
    </div>
  );
};

export default Home;
