function shuffle(array) {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

async function getName(userId) {
  const axios = require("axios");

  if (!userId) {
    throw new Error("UserID is null");
  }

  try {
    const { data } = await axios.get(
      `https://api.line.me/v2/bot/profile/${userId}`,
      {
        headers: { authorization: "Bearer " + process.env.ACCESS_TOKEN }
      }
    );

    return  data.displayName;
  } catch (err) {
    throw new Error("Cannot get userName");
  }

}

function getDurationHHmm(str) {
  const moment = require("moment");
  const scheduled = moment(str, "HH:mm");
  const now = moment(new Date());
  return moment.duration(scheduled.diff(now)).asMilliseconds();
}

module.exports = { shuffle, getName, getDurationHHmm };
