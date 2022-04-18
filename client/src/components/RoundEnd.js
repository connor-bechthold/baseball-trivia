import { Box, Button, styled, Typography } from "@mui/material";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "..";
import { resetGame } from "../actions/game";
import { resetPlayer } from "../actions/player";
import Leaderboard from "./Leaderboard";

const mapStateToProps = (state) => {
  return {
    type: state.player.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPlayer: () => dispatch(resetPlayer()),
    resetGame: () => dispatch(resetGame()),
  };
};

const RoundEnd = ({
  isCorrect,
  correctAnswer,
  position,
  leaderboard,
  type,
  gameEnded,
  resetPlayer,
  resetGame,
}) => {
  const getNextQuestion = () => {
    socket.emit("getNextQuestion");
  };

  const finishGame = () => {
    if (type === "HOST") {
      socket.emit("hostLeft");
    } else if (type === "PLAYER") {
      socket.emit("playerLeft");
      resetPlayer();
      resetGame();
      navigate("/");
    }
  };

  //Navigation
  const navigate = useNavigate();

  //Styled incorrect/correct box
  const StyledBox = styled(Box)(({ backgroundColor }) => ({
    backgroundColor,
    height: "5em",
    width: "30%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
  }));

  //Position text display
  const positionText = gameEnded ? "finished" : "are currently";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="85vh"
    >
      <Box sx={{ width: "80%", textAlign: "center" }}>
        {isCorrect ? (
          <StyledBox backgroundColor="#56C362">
            <Typography variant="h3">CORRECT</Typography>
          </StyledBox>
        ) : (
          <StyledBox backgroundColor="#E05B5B">
            <Typography variant="h3">INCORRECT</Typography>
          </StyledBox>
        )}
        {isCorrect ? (
          <Typography variant="h6">{`You ${positionText} in ${position} place`}</Typography>
        ) : (
          <Typography variant="h6">
            {`The correct answer was: ${correctAnswer}. You ${positionText} in ${position}
            place`}
          </Typography>
        )}
        <Typography variant="h4" sx={{ paddingTop: "15px" }}>
          Top 5
        </Typography>
        <Leaderboard leaderboard={leaderboard} />
        {type === "HOST" && !gameEnded && (
          <Button
            variant="contained"
            size="large"
            sx={{ marginTop: "30px" }}
            onClick={getNextQuestion}
          >
            Next Question
          </Button>
        )}
        {gameEnded && (
          <Button
            variant="contained"
            size="large"
            sx={{ marginTop: "30px" }}
            onClick={finishGame}
          >
            Home
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundEnd);
