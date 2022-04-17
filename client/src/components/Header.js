import { Box, Typography } from "@mui/material";

const Header = ({ currentQuestion, totalQuestions }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: "100%",
        backgroundColor: "white",
        position: "fixed",
        top: "0",
        height: "5vh",
      }}
    >
      <Typography variant="h5" sx={{ marginLeft: "10px" }}>
        Sprivia
      </Typography>
      <Typography variant="h5" sx={{ marginRight: "10px" }}>
        {`Question ${currentQuestion} of ${totalQuestions}`}
      </Typography>
    </Box>
  );
};

export default Header;
