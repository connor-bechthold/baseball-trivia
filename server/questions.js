const axios = require("axios");

//Util function to retrieve questions from Open Trivia Database
async function getQuestions(difficulty, numberOfQuestions) {
  let baseURL = `https://opentdb.com/api.php?category=21&amount=${numberOfQuestions}`;

  if (difficulty) {
    baseURL += `&difficulty=${difficulty}`;
  }

  try {
    const res = await axios.get(baseURL);
    return res.data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getQuestions,
};
