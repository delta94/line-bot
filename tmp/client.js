require('dotenv').config();
const Client = require("@line/bot-sdk").Client;
const config = {
  channelAccessToken: "process.env.ACCESS_TOKEN",
  channelSecret: process.env.SECRET
};
const client = new Client(config);

// const message = "life is short smile while you still have teeth";

const IDS = {
  "trua-nay-an-gi": "C62ba46d6214c2bbbc70cb953913d3fbd",
  "xiaolin": "C555f4fde4b462dd2b5a00454930135bc"
};

client.pushMessage(IDS["trua-nay-an-gi"], "Life is short, smile while you still have teeth.").catch(e => console.log(e.response.data));

// client.leaveGroup("C62ba46d6214c2bbbc70cb953913d3fbd");

// client.pushMessage(IDS["trua-nay-an-gi"], {
//   type: "sticker",
//   packageId: "11538",
//   stickerId: "51626529"
// });
