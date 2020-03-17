const axios = require("axios");
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
    return `Mình đi ăn ${item} nha!`;
  }

  if (message.startsWith("bot ơi gọi tao họp lúc ")) {
    try {
      const name = await utils.getName(source.userId);
      const time = message.replace("bot ơi gọi tao họp lúc ", "");
      await doNotify(source.userId, time);

      return `Ok, noted nha ${name}`;
    } catch (err) {
      return "Chưa vô like bot thì đừng có gọi Bot, hứ!";
    }
  }

  if (message === "bot" || message === "jarvis") {
    try {
      const name = await utils.getName(source.userId);
      return `Dạ, ${name} gọi em ạ?`;
    } catch(err) {
      return "Gọi gọi cái gì, chưa like bot thì không tương tác với bot được đâu đó nghen!";
    }
  }

  if (message === "lol") {
    return "Lo code đi, chat chat cái gì?";
  }

  if (message === "haha") {
    return "Hahahahahahahaha";
  }

  if (message === "corona") {
    const { cases, todayCases, deaths, critical } = await getCorona();
    return `Tổng số ca là ${cases}, số ca mới hôm nay là ${todayCases}, số người chết là ${deaths}, số người nguy kịch là ${critical}.`;
  }

  if (
    message.includes("bot") &&
    /ngu|gà|chó|cc|cl|đm|đcm|cút|óc/.test(message)
  ) {
    try {
      const name = await utils.getName(source.userId);
      return `Gì vậy ${name}, Bot cũng biết buồn đó nha!!`;
    } catch(err) {
      return "Gọi gọi cái gì, chưa like bot thì không tương tác với bot được đâu đó nghen!";
    }
  }

  if (message.includes("bot")) {
    try {
      const name = await utils.getName(source.userId);
      return `${name} nói gì gì Bot dạ, hem hiểu?`;
    } catch(err) {
      return "Gọi gọi cái gì, chưa like bot thì không tương tác với bot được đâu đó nghen!";
    }
  }

  return null;
}

module.exports = processMessage;
