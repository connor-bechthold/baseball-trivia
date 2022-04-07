import React from "react";
import Home from "../components/Home";
import WaitingArea from "../components/WaitingArea";
import Game from "../components/Game";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/waiting" element={<WaitingArea />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
