const CronJob = require('cron').CronJob;
const notify = require("../utils/notify");
const hn = require("../processors/hn")

function executeCron() {
  const morning = new CronJob('00 30 06 * * 1-5', function() {
    notify(`Morningg mn, chúc mọi người một ngày làm việc mới vui vẻ nha ahihi`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  morning.start();

  const morning2 = new CronJob('00 35 06 * * 1-5', function() {
    notify(`Đọc tin tức buổi sáng nè mọi người :D`);
    hn().then(d => notify(d));
  }, null, true, 'Asia/Ho_Chi_Minh');
  // morning2.start();

  const lunch = new CronJob('00 50 11 * * 1-5', function() {
    notify(`Trưa tới rồi, mình đi ăn trưa nha mn!!`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  lunch.start();

  const dinner = new CronJob('00 45 17 * * 1-5', function() {
    notify(`Sắp 6 giờ chiều rồi nè, về đi ăn tối thôi mn!`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  dinner.start();
}

module.exports = executeCron;
