module.exports = function (bot) {
  var module = {};

  bot.on("chat", (username, message) => {
    const player = bot.players[username];

    if (!player) {
      bot.chat("I can't see you.");
      return;
    }
  });

  return module;
};
