const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();

async function translateText(text, lang = "vi") {
  let [translations] = await translate.translate(text, lang);
  translations = Array.isArray(translations) ? translations : [translations];
  return translations[0];
}

module.exports = translateText;
