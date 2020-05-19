const notify = require("../utils/notify");
const utils = require("../utils/utils");

const os = require("os");
console.log(process.cpuUsage());

function getContentAndTimeFromMsg(originalStr) {
  if (/atd|add/.test(originalStr)) {
    const result = originalStr.split(" ");
    const time = result[result.length - 1];
    result.shift();
    result.pop();
    return {
      content: result.join(" "),
      time
    };
  }

  const str = originalStr
    .replace("bot ơi nhắc ", "")
    .replace("bot ơi gọi ", "")
    .replace("bot ơi kêu ", "")
    .replace(/tao/g, "");
  const index = str.search("lúc");

  if (index === -1) {
    throw new Error("Invalid string, cannot process");
  }

  const content = str.slice(0, index).trim();
  const time = str.slice(index + 4).trim();
  return {
    content,
    time
  };
}

function doNotify(name, content, time) {
  try {
    const duration = utils.getDurationHHmm(time);

    setTimeout(() => {
      notify(`${name} ơi, tới giờ "${content}" rồi bạn toy ơi!!`, "VLzUdQAb5AgMUqpOcO4TK9t6L3dtOOQQxKdcC3EbJyD");
      removeNotice(name, content, time);
    }, duration);

    setTimeout(() => {
      notify("Lẹ lẹ plz!", "VLzUdQAb5AgMUqpOcO4TK9t6L3dtOOQQxKdcC3EbJyD");
    }, duration + 2000);

    return true;
  } catch (err) {
    throw err;
  }
}

noticeObj = {};

function saveNotice(name, content, time) {
  const str = `${content} - ${time}`;
  const oldList = noticeObj[name] || [];
  noticeObj[name] = [
    ...oldList,
    str
  ];
}

function removeNotice(name, content, time) {
  const str = `${content} - ${time}`;
  const oldList = noticeObj[name] || [];
  noticeObj[name] = oldList.filter(l => l !== str);
}

function addNotice(m, name) {
  const { content, time } = getContentAndTimeFromMsg(m);
  saveNotice(name, content, time);
  doNotify(name, content, time);
  return true;
}

function getNotice(name) {
  const arr = noticeObj[name] || [];
  if (!arr.length) {
    return "Không có";
  }

  return arr.join('\r\n');
}

module.exports = { addNotice, getNotice };
