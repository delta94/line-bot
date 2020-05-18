const axios = require("axios");

async function getLyrics(title) {
  const { data } = await axios.get(`https://some-random-api.ml/lyrics?title=${title}`);
  return data.lyrics || "Không có";
}

module.exports = getLyrics;
