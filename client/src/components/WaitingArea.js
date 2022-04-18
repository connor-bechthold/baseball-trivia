import {
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "..";

const mapStateToProps = (state) => {
  return {
    type: state.player.type,
    gameId: state.game.gameId,
  };
};

const WaitingArea = ({ gameId, type }) => {
  //Navigation
  const navigate = useNavigate();
  //Player state
  const [players, setPlayers] = useState([]);
  //Copy button
  const [copyOpen, setCopyOpen] = useState(false);

  //Get the initial player data on component mount
  useEffect(() => {
    socket.emit("getPlayersData", { gameId });
  }, [gameId]);

  //If a new player joins, update state
  socket.on("playersData", (players) => {
    setPlayers(players);
  });

  //Host has initiated the game to start
  socket.on("hostStartedGame", () => {
    navigate("/game");
  });

  //Handle the copy button click
  const handleCopy = () => {
    setCopyOpen(true);
    //Write the game ID to the clipboard
    navigator.clipboard.writeText(gameId);
  };

  const startGame = () => {
    socket.emit("startGame");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box sx={{ height: "80vh", width: "100%", textAlign: "center" }}>
        {type === "HOST" && (
          <>
            <Box display="flex" justifyContent="center" gap="40px">
              <Typography variant="h3">Game Code:</Typography>
              <TextField
                sx={{ width: "40%", input: { color: "white" } }}
                defaultValue={gameId}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button variant="contained" onClick={handleCopy}>
                Copy
              </Button>
            </Box>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Share the code above with your friends and see their names below!
            </Typography>
            <Snackbar
              open={copyOpen}
              onClose={() => setCopyOpen(false)}
              autoHideDuration={2000}
              message="Copied to clipboard"
            />
          </>
        )}
        <Typography variant="h3" sx={{ marginTop: "30px" }}>
          Players
        </Typography>
        {type === "PLAYER" && (
          <Typography variant="h6">Waiting for host to start...</Typography>
        )}
        <Grid container spacing={2}>
          {players.map((player) => {
            if (player.playerId === socket.id) {
              return (
                <Grid item xs={3} key={player.playerId}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#E05B5B" }}
                  >
                    {player.name}
                  </Typography>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={3} key={player.playerId}>
                  <Typography variant="h6">{player.name}</Typography>
                </Grid>
              );
            }
          })}
        </Grid>
        {type === "HOST" && (
          <Button
            variant="contained"
            size="large"
            onClick={startGame}
            sx={{ marginTop: "20px" }}
          >
            Start Game
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(WaitingArea);
