const utils = require("./utils");

let items = ["Phố Thị", "UpTown", "Cơm 27K"];
let queues = [];

// Todo: Improve Shuffle: Random Shuffle when reinit the queue is not so efficient
// Todo: Add persistence feature: Sync / Save items and queues to hard disk

function processMessage(originalMessage) {
  const message = originalMessage.trim().toLowerCase();

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
    return "Dạ, bot nghe";
  }

  if (message === "lol") {
    return "Lo code đi, chat chat cái gì?";
  }

  if (message === "haha") {
    return "Hahahahahahahaha";
  }

  if (
    message.includes("bot") &&
    /ngu|gà|chó|cc|cl|đm|đcm|cút|óc/.test(message)
  ) {
    return "Bot cũng biết buồn đó nha!!";
  }

  if (message.includes("bot")) {
    return "Hello, ai gọi gì Bot dạ?";
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

module.exports = processMessage;
