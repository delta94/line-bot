const axios = require("axios");
const utils = require("./utils");

let items = ["Phố Thị", "UpTown", "Cơm 27K"];
let queues = [];

let memo = {};

// Todo: Improve Shuffle: Random Shuffle when reinit the queue is not so efficient
// Todo: Add persistence feature: Sync / Save items and queues to hard disk

async function processMessage(originalMessage, source) {
  console.log(source);
  console.log(originalMessage);
  const message = originalMessage.trim().toLowerCase();

  if (message.startsWith("bot ơi gọi tao họp lúc ")) {
    if (!source.userId) {
      return "Chưa vô like bot thì đừng có gọi Bot, hứ!";
    }

    const push = require("./push");
    const time = message.replace("bot ơi gọi tao họp lúc ", "");
    const duration = utils.getDurationHHmm(time);

    setTimeout(() => {
      push(source.userId, "Đi họp thôi bạn toy ơi!!");
    }, duration);

    setTimeout(() => {
      push(source.userId, "Lẹ lẹ!");
    }, duration + 3000);

    console.log(`Scheduled ${userId} at ${duration}`);

    try {
      const { data } = await axios.get(
        `https://api.line.me/v2/bot/profile/${source.userId}`,
        {
          headers: { authorization: "Bearer " + process.env.ACCESS_TOKEN }
        }
      );

      const name = data.displayName;
      return `Ok, noted nha ${name}`;
    } catch (err) {
      console.log(err);
      return `Ok, noted`;
    }
  }

  if (message === "danh sách quán") {
    const list = items.join(", ");
    return `Danh sách quán nè: ${list}`;
  }

  if (message.startsWith("thêm quán")) {
    const newItem = handleAddItem(message);
    return `Đã thêm quán ${newItem}`;
  }

  if (message.startsWith("xoá quán")) {
    const removed = handleRemoveItem(message);
    if (removed) {
      return `Đã xoá quán ${removed}`;
    } else {
      return "Không tìm thấy quán";
    }
  }

  if (message === "ăn gì" || message === "quán nào" || message === "đổi quán") {
    const item = handleGetFromQueue();
    return `Mình đi ăn ${item} nha!`;
  }

  if (message === "bot") {
    if (!source.userId) {
      return "Chưa vô like bot thì đừng có gọi Bot, hứ!";
    }

    const { data } = await axios.get(
      `https://api.line.me/v2/bot/profile/${source.userId}`,
      {
        headers: { authorization: "Bearer " + process.env.ACCESS_TOKEN }
      }
    );
    const name = data.displayName;

    return `Dạ, ${name} gọi em ạ?`;
  }

  if (message === "lol") {
    return "Lo code đi, chat chat cái gì?";
  }

  if (message === "haha") {
    return "Hahahahahahahaha";
  }

  if (message === "corona") {
    return await getCorona();
  }

  if (
    message.includes("bot") &&
    /ngu|gà|chó|cc|cl|đm|đcm|cút|óc/.test(message)
  ) {
    return "Bot cũng biết buồn đó nha!!";
  }

  if (message.includes("bot")) {
    if (!source.userId) {
      return "Gọi gọi cái gì, chưa like bot thì không tương tác với bot được đâu đó nghen!";
    }

    const { data } = await axios.get(
      `https://api.line.me/v2/bot/profile/${source.userId}`,
      {
        headers: { authorization: "Bearer " + process.env.ACCESS_TOKEN }
      }
    );
    const name = data.displayName;

    return `${name} nói gì gì Bot dạ, hem hiểu?`;
  }

  if (message.includes("nhậu")) {
    return "Giờ này đang mùa dịch corona, hông đi nhậu nha!!";
  }

  return null;
}

function handleAddItem(message) {
  const itemToAdd = message.replace("thêm quán ", "");

  items = [...items, itemToAdd];
  console.log("List items: ", items);

  return itemToAdd;
}

function handleRemoveItem(message) {
  const itemToRemove = message.replace("xoá quán ", "");

  items = items.filter(i => i.toLowerCase() !== itemToRemove);
  queues = queues.filter(i => i.toLowerCase() !== itemToRemove);
  console.log("List items: ", items);

  return itemToRemove;
}

function handleGetFromQueue() {
  // If queue is empty, re-init it
  if (!queues.length) {
    const clonedItems = [...items];
    const shuffledItems = utils.shuffle(clonedItems);
    queues = shuffledItems;
  }

  const result = queues.shift();

  return result;
}

async function getCorona() {
  const { data } = await axios.get(
    "https://coronavirus-19-api.herokuapp.com/countries"
  );
  const vietnam = data.find(e => e.country === "Vietnam");
  const { cases, todayCases, deaths, critical } = vietnam;
  return `Tổng số ca là ${cases}, số ca mới hôm nay là ${todayCases}, số người chết là ${deaths}, số người nguy kịch là ${critical}.`;
}

module.exports = processMessage;
