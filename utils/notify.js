const axios = require("axios");
const qs = require("querystring");

function sendNotify(msg) {
  const config = {
    headers: { Authorization: `Bearer ppbeJBiPP6VpdbNY5HfnN7N8lssX5gl5X2k8obOYNlj` }
  };
  const obj = {
    message: msg
  };

  const { data } = axios.post("https://notify-api.line.me/api/notify", qs.stringify(obj), config);
  return data;
}

module.exports = sendNotify;
