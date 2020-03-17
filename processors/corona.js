const axios = require("axios");

async function getCorona() {
  const { data } = await axios.get(
    "https://coronavirus-19-api.herokuapp.com/countries"
  );
  const vietnam = data.find(e => e.country === "Vietnam");
  const { cases, todayCases, deaths, critical } = vietnam;
  return { cases, todayCases, deaths, critical };
}

module.exports = getCorona;
