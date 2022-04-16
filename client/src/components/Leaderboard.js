import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Leaderboard = ({ leaderboard }) => {
  return (
    <div>
      <h1>LEADERBOARD</h1>
      <TableContainer component={Paper} sx={{ width: "90%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((player) => (
              <TableRow
                key={player.playerId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaderboard;
