async function trashTalk(text) {
  const axios = require("axios");

  try {
    const { data } = await axios.get(`https://simsumi.herokuapp.com/api`, {
      params: {
        text,
        lang: 'vi'
      }
    });

    return data && data.success || "Ai biết";
  } catch(err) {
    throw err;
  }
}

module.exports = {
  trashTalk
};
