const Client = require("@line/bot-sdk").Client;
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET
};
const client = new Client(config);

function push(userId, message) {
  try {
    return client.pushMessage(userId, {
      type: "text",
      text: message
    });
  } catch (err) {
    throw err;
  }
}

module.exports = push;
