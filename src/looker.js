// look at the closest entity
module.exports = function (bot) {
const mineflayer = require('mineflayer')


bot.once('spawn', function () {
  setInterval(() => {
    const entity = bot.nearestEntity()
    if (entity !== null) {
      if (entity.type === 'player') {
        bot.lookAt(entity.position.offset(0, 1.6, 0))
      } else if (entity.type === 'mob') {
        bot.lookAt(entity.position)
      }
    }
  }, 50)
})


return module;
};