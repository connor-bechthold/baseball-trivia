import gameReducer from "../reducers/game";
import { combineReducers, createStore } from "redux";

const store = createStore(
  combineReducers({
    game: gameReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
