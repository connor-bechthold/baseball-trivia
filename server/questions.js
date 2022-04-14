const axios = require("axios");

//Util function to retrieve questions from Open Trivia Database
async function getQuestions(difficulty, numberOfQuestions) {
  let baseURL = `https://opentdb.com/api.php?category=21&encode=url3986&amount=${numberOfQuestions}`;

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

function prepQuestion(question) {
  const options = [question.correct_answer, ...question.incorrect_answers];

  //Decode each answer from URL format (which we get from the API)
  for (let i = 0; i < options.length; i++) {
    options[i] = decodeURIComponent(options[i]);
  }

  //Re-order the elements so the correct answer isn't always first
  //Uses Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    type: question.type,
    question: decodeURIComponent(question.question),
    options: options,
  };
}

module.exports = {
  getQuestions,
  prepQuestion,
};
