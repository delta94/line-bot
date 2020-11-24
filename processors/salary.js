const moment = require("moment");

function getSalaryDateCountDown() {
  const start = moment();
  let end = moment().endOf('month').subtract(moment().daysInMonth() === 31 ? 2 : 1, "days");
  const endNum = end.isoWeekday();
  if (endNum === 6) {
    end = end.subtract(1, "days");
  } else if (endNum === 7) {
    end = end.subtract(2, "days");
  }
  const days = moment.duration(end.diff(start)).asDays() - 0.5;
  return Math.round(days);
}

module.exports = getSalaryDateCountDown;
