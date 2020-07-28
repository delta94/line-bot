const axios = require("axios");

async function getHey() {
  const { data } = await axios.get("https://meme-api.glitch.me/dank");
  return data.meme;
}

module.exports = getHey;
