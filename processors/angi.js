const utils = require("../utils/utils");

// Todo: Improve Shuffle: Random Shuffle when reinit the queue is not so efficient
// Todo: Add persistence feature: Sync / Save items and queues to hard disk

let items = ["Phố Thị", "UpTown", "Cơm 27K"];
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

  queues.shift();
  return queues;
}

function list() {
  return items.join(", ");
}

module.exports = { add, remove, get, list };
