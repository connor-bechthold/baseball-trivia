export const setName = (name) => {
  return {
    type: "SET_NAME",
    name,
  };
};

export const setHost = () => {
  return {
    type: "SET_HOST",
  };
};

export const setPlayer = () => {
  return {
    type: "SET_PLAYER",
  };
};

export const resetPlayer = () => {
  return {
    type: "RESET_PLAYER",
  };
};
