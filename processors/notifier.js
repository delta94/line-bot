const notify = require("../utils/notify");
const utils = require("../utils/utils");

async function doNotify(name, time) {
  try {
    const duration = utils.getDurationHHmm(time);

    setTimeout(() => {
      notify(`${name} ơi, đi họp thôi bạn toy ơi!!`, "VLzUdQAb5AgMUqpOcO4TK9t6L3dtOOQQxKdcC3EbJyD");
    }, duration);

    setTimeout(() => {
      notify("Lẹ lẹ plz!", "VLzUdQAb5AgMUqpOcO4TK9t6L3dtOOQQxKdcC3EbJyD");
    }, duration + 2000);

    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = doNotify;
