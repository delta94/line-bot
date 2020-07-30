const getCorona = require("./corona");

let currentCases = 459;

async function coronaLive() {
  const { cases, source } = await getCorona();
  if (cases > currentCases) {
    const notify = require("../utils/notify");
    notify(`Việt Nam có thêm ca nhiễm Corona mới mọi người ơi, tổng số cases là ${cases}!! ${source}.`);
    currentCases = cases;
  }
}

async function coronaInterval() {
  setInterval(coronaLive, 60000);
}

module.exports = coronaInterval;
