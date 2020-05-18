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
      lang: "vi"
    }, config);

    return data && data.atext || "Chat chậm chậm thôi chứ bot hem theo kịp";
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
