import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { socket } from "..";

const Leaderboard = ({ leaderboard }) => {
  return (
    <Box sx={{ width: "50%", margin: "20px auto 0" }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {leaderboard.map((player) => {
              const backgroundColor =
                player.playerId === socket.id ? "#E05B5B" : "#201f30";
              return (
                <TableRow key={player.playerId} sx={{ backgroundColor }}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    <Typography variant="h5" sx={{ color: "white" }}>
                      {player.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ borderBottom: "none" }}>
                    <Typography variant="h5" sx={{ color: "white" }}>
                      {player.score}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;
