const simsimi = require("simsimi")({
  key: "XXenhvc1vueZDgpW09G3B8Tyql2dE.ghSVMbLvvZ"
});

async function translateText(text) {
  return await simsimi(text);
}

module.exports = translateText;
