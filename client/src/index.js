import React from "react";
import io from "socket.io-client";
import store from "./store/storeConfig";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

//Setup global socket constant
export const socket = io("http://localhost:3001");

//Setup global axios constant
export const axios = require("axios").default;
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
