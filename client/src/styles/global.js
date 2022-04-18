import { createTheme } from "@mui/material";

export const globalTheme = createTheme({
  typography: {
    color: "white",
    h3: {
      fontFamily: "'Fredoka One', cursive",
      color: "white",
    },
    h4: {
      fontFamily: "'Fredoka One', cursive",
      color: "white",
    },
    h5: {
      fontFamily: "'Fredoka One', cursive",
      color: "#201f30",
    },
    h6: {
      color: "white",
      marginTop: "15px",
    },
    body2: {
      color: "white",
    },
  },

  palette: {
    primary: {
      main: "#E05B5B",
      contrastText: "white",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Fredoka One', cursive",
        },
      },
    },
  },
});
