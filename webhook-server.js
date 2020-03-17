const express = require("express");
const line = require("@line/bot-sdk");
const processMessage = require("./process");

const middleware = require("@line/bot-sdk").middleware;
const JSONParseError = require("@line/bot-sdk").JSONParseError;
const SignatureValidationFailed = require("@line/bot-sdk")
  .SignatureValidationFailed;

// Tood: Add to .env (dotenv)
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET
};

const app = express();
app.post("/webhook", middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  console.info(event.source.userId);
  console.log(event.message.text);

  processMessage(event.message.text)
    .then(responseMessage => {
      if (responseMessage) {
        return client.replyMessage(event.replyToken, {
          type: "text",
          text: responseMessage
        });
      }

      return Promise.resolve(null);
    })
    .catch(() => Promise.resolve(null));
}

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature);
    return;
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw);
    return;
  }
  next(err); // will throw default 500
});

app.listen(7777, () =>
  console.log("Webhook server is listening on port 7777.")
);
