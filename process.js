const utils = require("./utils/utils");

const angi = require("./processors/angi");
const doNotify = require("./processors/notifier");
const getCorona = require("./processors/corona");

async function processMessage(originalMessage, source) {
  const message = originalMessage.trim().toLowerCase();

  if (message === "danh sách quán") {
    const list = angi.list();
    return `Danh sách quán nè: ${list}`;
  }

  if (message.startsWith("thêm quán")) {
    const itemToAdd = message.replace("thêm quán ", "");
    const newItem = angi.add(itemToAdd);
    return `Đã thêm quán ${newItem}`;
  }

  if (message.startsWith("xoá quán")) {
    const itemToRemove = message.replace("xoá quán ", "");
    const removed = angi.remove(itemToRemove);
    if (removed) {
      return `Đã xoá quán ${removed}`;
    } else {
      return "Không tìm thấy quán";
    }
  }

  if (message === "ăn gì" || message === "quán nào" || message === "đổi quán") {
    const item = angi.get();
    return `Mình đi ăn ${item} nha mọi người!`;
  }

  if (message.startsWith("bot ơi gọi tao họp lúc ")) {
    try {
      const name = await utils.getName(source.userId);
      const time = message.replace("bot ơi gọi tao họp lúc ", "");
      await doNotify(source.userId, time);

      return `Ok, noted nha ${name}`;
    } catch (err) {
      return "Chưa vô add friend với Brown thì đừng có gọi, hứ!";
    }
  }

  if (message === "bot" || message === "jarvis" || message === "brown") {
    try {
      const name = await utils.getName(source.userId);
      return `Dạ, ${name} gọi em ạ?`;
    } catch(err) {
      return null;
    }
  }

  if (message === "corona") {
    const { cases, source } = await getCorona();
    return `Tổng số ca nhiễm Corona ở Việt Nam là ${cases}. ${source}.`;
  }

  if (
    (message.includes("bot") || message.includes("brown")) &&
    /ngu|gà|chó|cc|cl|đm|đcm|cút|óc/.test(message)
  ) {
    try {
      const name = await utils.getName(source.userId);
      return `Sao chửi Brown vậy ${name}, Brown cũng biết buồn đó nha!!`;
    } catch(err) {
      return `Đừng chửi em, vô add friend với em đi!!`;
    }
  }

  return null;
}

module.exports = processMessage;
