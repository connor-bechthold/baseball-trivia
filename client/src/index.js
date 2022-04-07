import React from "react";
import io from "socket.io-client";
import store from "./store/storeConfig";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

export const socket = io.connect("http://localhost:3001");

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
