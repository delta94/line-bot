const Client = require("@line/bot-sdk").Client;
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET
};
const client = new Client(config);

const truanayangiGroup = "C62ba46d6214c2bbbc70cb953913d3fbd";
const message = process.argv.slice(2).join(" ");

// client.pushMessage(truanayangiGroup, {
//   type: "text",
//   text: message
// });

// client.pushMessage(truanayangiGroup, {
//   type: "sticker",
//   packageId: "11537",
//   stickerId: "52002739"
// });
