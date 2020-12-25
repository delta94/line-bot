const axios = require('axios')

async function news() {
  const { data } = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvnexpress.net%2Frss%2Ftin-noi-bat.rss')
  const items = data.items
  let msg = ""
  for (const i of items) {
    msg += i.title + "\n" + ` ${i.link}` + " \n\n"
  }
  return msg
}

module.exports = news;
