const getCorona = require("./corona");

let currentCases = 1451;

async function coronaLive() {
  const { cases, source } = await getCorona();
  if (parseInt(cases) > currentCases) {
    const newCases = cases - currentCases;
    const notify = require("../utils/notify");
    notify(`Việt Nam có thêm ${newCases} ca nhiễm Corona mới mọi người ơi, tổng số cases là ${cases}!! ${source}.`);
    currentCases = cases;
  }
}

async function coronaInterval() {
  setInterval(coronaLive, 60000);
}

module.exports = coronaInterval;
