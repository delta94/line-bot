const axios = require("axios");

async function getMeme() {
  const { data } = await axios.get("https://meme-api.herokuapp.com/gimme");
  return data.url;
}

module.exports = getMeme;
