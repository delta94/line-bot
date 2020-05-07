let key = "keUDwl_KwDUCwqOWB~oPRBvRsKKd-Vfcjr93zLmX";

async function trashTalk(text) {
  const axios = require("axios");

  let config = {
    headers: {
      "x-api-key": key
    }
  }

  try {
    const { data } = await axios.post(`https://wsapi.simsimi.com/190410/talk`, {
      utext: text,
      lang: "vi",
      "atext_bad_prob_max": 0.5
    }, config);

    return data && data.atext || "Lỗi rồi";
  } catch(err) {
    throw err;
  }
}

function setKey(newKey) {
  key = newKey;
}

module.exports = {
  trashTalk,
  setKey
};
