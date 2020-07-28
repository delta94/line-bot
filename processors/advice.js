const axios = require("axios");

async function getAdvice() {
  const { data } = await axios.get("https://api.adviceslip.com/advice");
  return data.slip.advice;
}

module.exports = getAdvice;
