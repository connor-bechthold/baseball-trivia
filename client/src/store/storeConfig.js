import { combineReducers, createStore } from "redux";
import gameReducer from "../reducers/game";
import playerReducer from "../reducers/player";

const store = createStore(
  combineReducers({
    player: playerReducer,
    game: gameReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
