const Client = require("@line/bot-sdk").Client;
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET
};
const client = new Client(config);

const truanayangiGroup = "C62ba46d6214c2bbbc70cb953913d3fbd";
const xiaolin = "C555f4fde4b462dd2b5a00454930135bc";

client.pushMessage("Ub02f1cb38272ad0846eda5983e3b5727", {
  type: "text",
  text: "Hem có gì hihi"
});
