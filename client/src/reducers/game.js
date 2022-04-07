const defaultGame = {
  categories: [],
};

const gameReducer = (state = defaultGame, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        categories: action.categories,
        ...state,
      };
    default:
      return state;
  }
};

export default gameReducer;
