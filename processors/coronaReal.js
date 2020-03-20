const getCorona = require("./corona");

let currentCases = 84;

async function coronaLive() {
  const { cases } = await getCorona();
  if (cases > currentCases) {
    const push = require("./push");
    push("C62ba46d6214c2bbbc70cb953913d3fbd", `Việt Nam có thêm ca nhiễm Corona mới mọi người ơi, tổng số cases là ${cases}!!`);
    currentCases = cases;
  }
}

async function coronaInterval() {
  setInterval(coronaLive, 60000);
}

module.exports = coronaInterval;
