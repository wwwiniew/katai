
module.exports = function (bot) {
  var module = {};

var elizabot = require('./elizabot.js')
 var initial = elizabot.start();
 console.log(initial);

  bot.on('chat', (username, message) => {
      const player = bot.players[username]
  
      if (!player) {
        bot.chat("I can't see you.")
        return
      }
      if (message==='quit') {
	      elizabot.quit();
      }

      bot.chat(elizabot.reply(message))
  })

return module;
}

