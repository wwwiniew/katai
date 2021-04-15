const mineflayer = require("mineflayer");

const bot = mineflayer.createBot({
  host: "192.168.1.102", // minecraft server ip
  username: "katai" // minecraft username
});

const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const pvp = require("mineflayer-pvp").plugin;
const guard = require("./guard.js")(bot);
const chat = require("./chat.js")(bot);
const scan = require("./scan.js")(bot);
var mongoUtil = require("./mongoutils.js");

mongoUtil.connectToServer(function (err, client) {
  if (err) console.log(err);
  // start the rest of your app here
});
bot.loadPlugin(pathfinder);
bot.loadPlugin(pvp);

bot.on("chat", (username, message) => {
  if (username === bot.username) return;
  bot.chat("chitchat" + message);
});

// Log errors and kick reasons:
bot.on("kicked", console.log);
bot.on("error", console.log);
