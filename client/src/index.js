import React from "react";
import io from "socket.io-client";
import store from "./store/storeConfig";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import { globalTheme } from "./styles/global";
import { ThemeProvider } from "@mui/material";

//Setup global socket constant
export const socket = io(process.env.REACT_APP_CONNECT_URL);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={globalTheme}>
      <AppRouter />
    </ThemeProvider>
  </Provider>
);
