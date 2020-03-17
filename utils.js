function shuffle(array) {
  var m = array.length,
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

function getDurationHHmm(str) {
  if (!str || !str.includes(":")) {
    return -1;
  }

  const moment = require("moment");
  const scheduled = moment(str, "HH:mm");
  const now = moment(new Date());
  const duration = moment.duration(scheduled.diff(now)).asMilliseconds();
  return duration;
}

module.exports = { shuffle, getDurationHHmm };
