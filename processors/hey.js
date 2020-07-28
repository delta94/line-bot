const axios = require("axios");

async function getHey() {
  const { data } = await axios.get("http://yerkee.com/api/fortune/people");
  return data.fortune;
}

module.exports = getHey;
