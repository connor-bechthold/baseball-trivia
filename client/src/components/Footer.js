import { Box, Typography } from "@mui/material";

const Footer = ({ name, score }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: "100%",
        backgroundColor: "white",
        position: "fixed",
        bottom: "0",
        height: "5vh",
      }}
    >
      <Typography variant="h5" sx={{ marginLeft: "10px" }}>
        {name}
      </Typography>
      <Typography variant="h5" sx={{ marginRight: "10px" }}>
        {`Score: ${score}`}
      </Typography>
    </Box>
  );
};

export default Footer;
