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
  const moment = require("moment");
  const scheduled = moment(str, "HH:mm");
  const now = moment(new Date());
  const duration = moment.duration(scheduled.diff(now)).asMilliseconds();
  console.log("Duration func: ", duration);
  return duration;
}

module.exports = { shuffle, getDurationHHmm };
