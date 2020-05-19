const notify = require("../utils/notify");
const utils = require("../utils/utils");

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
  const token = tokenObj[name] || null;
  const betaToken = "VLzUdQAb5AgMUqpOcO4TK9t6L3dtOOQQxKdcC3EbJyD";

  try {
    const duration = utils.getDurationHHmm(time);

    setTimeout(() => {
      notify(`${name} ơi, tới giờ "${content}" rồi bạn ơi!!`, token || betaToken);
      removeNotice(name, content, time);
    }, duration);

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
  const tArr = arr.map(e => e.split(" - "));
  tArr.sort((a, b) => {
    if (a[1] > b[1]) {
      return 1;
    }
    if (a[1] < b[1]) {
      return -1;
    }
    return 0;
  });
  const fArr = tArr.map(e => `${e[0]} lúc ${e[1]}`);
  return fArr.join('\r\n');
}

tokenObj = {};

function setToken(name, token) {
  tokenObj[name] = token;
}

module.exports = { addNotice, getNotice, setToken };
