const push = require("./push");
const utils = require("../utils/utils");

async function doNotify(userId, time) {
  try {
    const duration = utils.getDurationHHmm(time);

    setTimeout(() => {
      push(userId, "Đi họp thôi bạn toy ơi!!");
    }, duration);

    setTimeout(() => {
      push(userId, "Lẹ lẹ!");
    }, duration + 3000);

    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = doNotify;
