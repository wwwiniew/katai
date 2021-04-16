const mineflayer = require("mineflayer");
const MongoClient = require("mongodb").MongoClient;
const bot = mineflayer.createBot({
  host: "192.168.1.102", // minecraft server ip
  username: "katai" // minecraft username
});

var mongoUtil = require("./mongoutils.js");
mongoUtil.connectToServer(function (err, client) {
  if (err) console.log(err);
  // start the rest of your app here
});
var db = mongoUtil.getDb();
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const pvp = require("mineflayer-pvp").plugin;
const guard = require("./guard.js")(bot);
const chat = require("./chat.js")(bot);
//const scan = require("./scan.js")(bot);

bot.loadPlugin(pathfinder);
bot.loadPlugin(pvp);

// Log errors and kick reasons:
bot.on("kicked", console.log);
bot.on("error", console.log);
