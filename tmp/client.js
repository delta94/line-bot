const Client = require("@line/bot-sdk").Client;
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET
};
const client = new Client(config);

const message = "SOMETHING";

const IDS = {
  "trua-nay-an-gi": "C62ba46d6214c2bbbc70cb953913d3fbd",
  "xiaolin": "C555f4fde4b462dd2b5a00454930135bc"
};

client.pushMessage(IDS["trua-nay-an-gi"], {
  type: "text",
  text: message || process.argv.slice(2).join(" ")
});

// client.pushMessage(truanayangiGroup, {
//   type: "sticker",
//   packageId: "11537",
//   stickerId: "52002739"
// });
