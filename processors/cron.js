const CronJob = require('cron').CronJob;
const notify = require("../utils/notify");

function executeCron() {
  const morning = new CronJob('30 09 * * *', function() {
    notify(`Morningg mn, chúc mọi người một ngày làm việc mới vui vẻ nha!!`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  morning.start();

  const lunch = new CronJob('55 11 * * *', function() {
    notify(`Trưa tới rồi, mình đi ăn trưa nha mn!! Hỏi Brown ăn gì nếu chưa biết ăn gì nha!!`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  lunch.start();

  const dinner = new CronJob('00 18 * * *', function() {
    notify(`6 giờ chiều rồi nè, về đi ăn tối thôi mn!`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  dinner.start();
}

module.exports = executeCron;
