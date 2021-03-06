const utils = require("./utils/utils");

const angi = require("./processors/angi");
const notifier = require("./processors/notifier");
const getCorona = require("./processors/corona");

let transMode = false;
let lang = "vi";

let trashMode = false;

async function processMessage(originalMessage, source) {
  const message = originalMessage.trim().toLowerCase();

  if (message === "triệu hồi LINE Friends" || message === "@all" || message === "kuchiyose no jutsu") {
    return [
      "Có Brown ạ",
      {
        type: "text",
        text: "Cony đây!",
        sender: {
          name: "Cony",
          iconUrl: "https://i.pinimg.com/originals/30/45/54/3045548af6f0524ba575196e9861861c.png"
        }
      },
      {
        type: "text",
        text:  "I am James :)",
        sender: {
          name: "James",
          iconUrl: "https://i.imgur.com/ul8y4WQ.png"
        }
      },
      {
        type: "text",
        text:  "We're LINE Friends OvO",
        sender: {
          name: "Leonard",
          iconUrl: "https://i.imgur.com/a7ovBLj.png"
        }
      },
    ]
  }

  if (message === "meme") {
    const getMeme = require("./processors/meme");
    const memeImage = await getMeme();
    return [
      {
        type: "image",
        image: memeImage
      }
    ]
  }

  if (message === "hey" || message === "quote") {
    const getHey = require("./processors/hey");
    const hey = await getHey();
    return [
      {
        type: "text",
        text: hey
      }
    ];
  }

  if (message === "advice" || message === "advise") {
    const getAdvice = require("./processors/advice");
    const advice = await getAdvice();
    return [
      {
        type: "text",
        text: advice
      }
    ];
  }

  if (message.startsWith("cony")) {
    return [
      {
        type: "text",
        text: "Ai gọi gì Cony dạ?",
        sender: {
          name: "Cony",
          iconUrl: "https://i.pinimg.com/originals/30/45/54/3045548af6f0524ba575196e9861861c.png"
        }
      },
      "Hehehe..."
    ]
  }

  if (message.startsWith("tìm lyric ")) {
    const title = message.replace("tìm lyric ", "");
    let getLyrics = require("./processors/lyrics");
    const lyric = await getLyrics(title);
    return {
      type: "text",
      text: lyric,
      sender: {
        name: "Cony",
        iconUrl: "https://i.pinimg.com/originals/30/45/54/3045548af6f0524ba575196e9861861c.png"
      }
    }
  }

  if (message === "trashtalk" || message === "trash") {
    trashMode = true;
    return "Để em gọi James ra trashtalk ạ!";
  }

  if (message === "bot ơi dịch" || message === "dịch") {
    transMode = true;
    return [
      "Dạ để em gọi Leonard ra dịch ạ!",
      {
        type: "text",
        text:  "Ok I'm ready!",
        sender: {
          name: "Leonard",
          iconUrl: "https://i.imgur.com/a7ovBLj.png"
        }
      },
    ]
  }

  if (message === "bot ơi ngừng dịch" || message === "ngừng dịch" || message === "stop" || message === "im") {
    transMode = false;
    return [
      {
        type: "text",
        text:  "Ok em sẽ hông dịch nữa, Brown ơi!",
        sender: {
          name: "Leonard",
          iconUrl: "https://i.imgur.com/a7ovBLj.png"
        }
      },
      "Okay!"
    ]
  }

  if (message === "stop trash") {
    trashMode = false;
    return [
      {
        type: "text",
        text:  "Ok fine, Brown ơi!",
        sender: {
          name: "James",
          iconUrl: "https://i.imgur.com/ul8y4WQ.png"
        }
      },
      "I'm back :)"
    ]
  }

  if (message === "news") {
    const news = require("./processors/news")
    return await news()
  }

  if (message === "hn") {
    const hn = require("./processors/hn")
    return await hn()
  }

  if (transMode) {
    if (message.startsWith("dịch ra ")) {
      lang = message.replace("dịch ra ", "");
      return {
        type: "text",
        text: `Dạ em sẽ dịch ra ${lang}!`,
        sender: {
          name: "Leonard",
          iconUrl: "https://i.imgur.com/a7ovBLj.png"
        }
      }
    }

    try {
      const translateText = require("./processors/translate");
      const text = await translateText(originalMessage, lang);
      return {
        type: "text",
        text,
        sender: {
          name: "Leonard",
          iconUrl: "https://i.imgur.com/a7ovBLj.png"
        }
      };
    } catch(err) {
      return {
        type: "text",
        text: `Lỗi khi dịch: ${err.toString()}`,
        sender: {
          name: "Leonard",
          iconUrl: "https://i.imgur.com/a7ovBLj.png"
        }
      };
    }
  }

  if (trashMode) {
    if (message.includes("chửi nam") || message.includes("chửi scott")) {
      return {
        type: "text",
        text: `mẹ mày nam . con chó ki ki`,
        sender: {
          name: "James",
          iconUrl: "https://i.imgur.com/ul8y4WQ.png"
        }
      }
    }

    try {
      const trashModule = require("./processors/simsimi");
      const trashText =  await trashModule.trashTalk(originalMessage);
      return {
        type: "text",
        text: trashText,
        sender: {
          name: "James",
          iconUrl: "https://i.imgur.com/ul8y4WQ.png"
        }
      }
    } catch(err) {
      if (err.response.status === 429) {
        trashMode = false;
        return {
          type: "text",
          text: `Hôm nay trashtalk thế là đủ rồi, mai mình tiếp nhé, Brown ơi ra đây đi!`,
          sender: {
            name: "James",
            iconUrl: "https://i.imgur.com/ul8y4WQ.png"
          }
        }
      }

      return {
        type: "text",
        text: message,
        sender: {
          name: "James",
          iconUrl: "https://i.imgur.com/ul8y4WQ.png"
        }
      }
    }
  }

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

  if (message.startsWith("bot ơi") && /gọi|nhắc|kêu/.test(message)
      || message.startsWith("add") || message.startsWith("atd")) {
    try {
      const name = await utils.getName(source.userId);
      notifier.addNotice(message, name);
      return `Ok, noted nha ${name}`;
    } catch (err) {
      return "Chưa vô add friend với Brown thì đừng có gọi, hứ!";
    }
  }

  if (message === "todo") {
    try {
      const name = await utils.getName(source.userId);
      return {
        type: "text",
        text: notifier.getNotice(name),
        sender: {
          name: "Cony",
          iconUrl: "https://i.pinimg.com/originals/30/45/54/3045548af6f0524ba575196e9861861c.png"
        }
      };
    } catch (err) {
      return "Chưa vô add friend với Brown thì đừng có gọi, hứ!";
    }
  }

  if (originalMessage.includes("setToken")) {
    const trueMsg = originalMessage.replace("setToken ", "");
    const arr = trueMsg.split(" ");
    const token = arr[arr.length - 1];
    arr.pop();
    const name = arr.join(" ");
    notifier.setToken(name, token);
    return `Đã set token cho ${name} là ${token}`;
  }

  if (message === "bot" || message === "jarvis" || message === "brown" ) {
    return "Dạ!";
  }

  if (message === "health" || message === "free") {
    const os = require("os");
    const load = os.loadavg().join(" ");
    return `Free Memory: ${os.freemem() / 1024 / 1024}/${os.totalmem() / 1024 / 1024}MB\nCPU Usage: User ${process.cpuUsage().user} / System ${process.cpuUsage().system}\nAverage Load: ${load}`;
  }

  if (message === "corona") {
    const { cases, source } = await getCorona();
    return `Tổng số ca nhiễm Corona ở Việt Nam là ${cases}. ${source}.`;
  }

  if (message === "salary" || message === "tiền" || message === "lương" || message === "luong") {
    const salary = require("./processors/salary");
    const days = salary();

    if (days === 0) {
      return [
        `Hôm nay là ngày nhận lương đó mọi người`,
        {
          type: "text",
          text: "Ting ting...",
          sender: {
            name: "James",
            iconUrl: "https://i.imgur.com/ul8y4WQ.png"
          }
        },
      ];
    }

    if (days < 0) {
      const moment = require("moment");
      const d = moment().daysInMonth() === 31 ? 2 : 1;
      const realDays = 29 + d;
      return [
        `Còn ${realDays} ngày nữa mới tới ngày được nhận lương mọi người ạ`,
        {
          type: "text",
          text: realDays >= 3 ? "Haizzzzzzza..." : "Yeyeeeeee...",
          sender: {
            name: "James",
            iconUrl: "https://i.imgur.com/ul8y4WQ.png"
          }
        },
      ];
    }

    return [
      `Còn ${days} ngày nữa mới tới ngày được nhận lương mọi người ạ`,
      {
        type: "text",
        text: days >= 3 ? "Haizzzzzzza..." : "Yeyeeeeee...",
        sender: {
          name: "James",
          iconUrl: "https://i.imgur.com/ul8y4WQ.png"
        }
      },
    ];
  }

  if (
    (message.includes("bot") || message.includes("brown")) &&
    /ngu|gà|chó|cc|cl|đm|đcm|cút|óc/.test(message)
  ) {
    try {
      const name = await utils.getName(source.userId);
      return [
        `Sao chửi Brown vậy ${name}, Brown cũng biết buồn đó nha!!`,
        {
          type: "text",
          text: `Sao ${name} dám ăn hiếp Brown? :)`,
          sender: {
            name: "Cony",
            iconUrl: "https://i.pinimg.com/originals/30/45/54/3045548af6f0524ba575196e9861861c.png"
          }
        },
      ];
    } catch(err) {
      return `Đừng chửi em, vô add friend với em đi!!`;
    }
  }

  return null;
}

module.exports = processMessage;
