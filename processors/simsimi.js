const simsimi = require("simsimi")({
  key: "XXenhvc1vueZDgpW09G3B8Tyql2dE.ghSVMbLvvZ"
});

async function trashTalk(text) {
  return await simsimi(text);
}

module.exports = trashTalk;
