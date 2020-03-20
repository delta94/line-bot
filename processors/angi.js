const utils = require("../utils/utils");

// Todo: Improve Shuffle: Random Shuffle when reinit the queue is not so efficient
// Todo: Add persistence feature: Sync / Save items and queues to hard disk

let items = ["phố thị", "uptown", "cơm 27K", "hủ tiếu mì", "cơm gà xối mỡ", "gò ò ó o", "bún đậu mắm tôm"];
let queues = [];

function add(itemToAdd) {
  items = [...items, itemToAdd];
  return itemToAdd;
}

function remove(itemToRemove) {
  items = items.filter(i => i.toLowerCase() !== itemToRemove);
  queues = queues.filter(i => i.toLowerCase() !== itemToRemove);
  return itemToRemove;
}

function get() {
  if (!queues.length) {
    const clonedItems = [...items];
    queues = utils.shuffle(clonedItems);
  }

  return queues.shift();
}

function list() {
  return items.join(", ");
}

module.exports = { add, remove, get, list };
