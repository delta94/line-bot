const axios = require('axios')

async function hn() {
  const { data } = await axios.get('http://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fhnrss.org%2Ffrontpage')
  const items = data.items
  let msg = ""
  for (const i of items) {
    msg += "-> " + i.title + "\n " + ` ${i.link}` + " \n"
  }
  return msg
}

module.exports = hn;
