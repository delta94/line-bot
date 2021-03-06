const axios = require('axios')

async function hn() {
  const { data } = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fhnrss.org%2Ffrontpage')
  const items = data.items
  let msg = ""
  for (const i of items) {
    msg += "-> " + i.title + "\n " + ` ${i.link}` + " \n"
  }
  console.log(msg);
  return msg
}

module.exports = hn;
