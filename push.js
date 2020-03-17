const Client = require("@line/bot-sdk").Client;
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET
};
const client = new Client(config);

function push(userId, message) {
  try {
    client.pushMessage(userId, {
      type: "text",
      text: message
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = push;
