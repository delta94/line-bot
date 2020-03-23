const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function getCoronaZing() {
  const { data } = await axios.get("https://news.zing.vn/dich-viem-phoi-corona.html?");
  const dom = new JSDOM(data);
  const scripts = dom.window.document.querySelectorAll("script");
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i] && scripts[i].innerHTML) {
      if (scripts[i].innerHTML.includes("window.coronaData")) {
        const scriptContent = scripts[i].innerHTML.trim();
        const jsonString = scriptContent.replace("window.coronaDataGlobal = ", "").slice(0, -1);
        const json = JSON.parse(jsonString);

        const source = json.source_vn;
        const vietnam = json.countries.find(e => e.country === 'vn');
        const cases = vietnam.cases;

        return { cases, source };
      }
    }
  }
}

async function getCorona() {
  let cases = 0;
  let todayCases = 0;

  const { data } = await axios.get("https://www.worldometers.info/coronavirus");
  const dom = new JSDOM(data);
  const table = dom.window.document.querySelector("#main_table_countries_today");
  const body = table.tBodies[0];
  for (let i = 0; i < body.rows.length; i++) {
    if (body.rows[i].cells[0].innerHTML === "Vietnam") {
      const casesStr = body.rows[i].cells[1].innerHTML;
      const todayCasesStr = body.rows[i].cells[2].innerHTML;
      cases = parseInt(casesStr);
      todayCases = parseInt(todayCasesStr.slice(1));
      break;
    }
  }

  return { cases, source: "Nguồn: WorldOMeters.", todayCases }
}

async function getCoronaLegacy() {
  const { data } = await axios.get(
    "https://coronavirus-19-api.herokuapp.com/countries"
  );
  const vietnam = data.find(e => e.country === "Vietnam");
  const { cases, todayCases, deaths, critical } = vietnam;
  return { cases, todayCases, deaths, critical };
}

module.exports = getCorona;
