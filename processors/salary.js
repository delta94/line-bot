const moment = require("moment");

function getSalaryDateCountDown() {
  const start = moment();
  const end = moment().endOf('month').subtract(moment().daysInMonth() === 31 ? 2 : 1, "days");
  const days = moment.duration(end.diff(start)).asDays() - 0.5;
  return Math.round(days);
}

module.exports = getSalaryDateCountDown;
