const CronJob = require('cron').CronJob;
const push = require("./push");

function executeCron() {
  const morning = new CronJob('00 10 * * *', function() {
    push("C62ba46d6214c2bbbc70cb953913d3fbd", `Morningg mn, chúc mọi người một ngày làm việc mới vui vẻ nha!!`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  morning.start();

  const lunch = new CronJob('55 11 * * *', function() {
    push("C62ba46d6214c2bbbc70cb953913d3fbd", `Trưa tới rồi, mình đi ăn trưa nha mn!! Hỏi Brown ăn gì nếu chưa biết ăn gì nha!!`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  lunch.start();

  const dinner = new CronJob('00 18 * * *', function() {
    push("C62ba46d6214c2bbbc70cb953913d3fbd", `6 giờ chiều rồi nè, về đi ăn tối thôi mn!`);
  }, null, true, 'Asia/Ho_Chi_Minh');
  dinner.start();
}

module.exports = executeCron;
