module.exports = function (bot) {
  var module = {};
  const armorManager = require('mineflayer-armor-manager')

  const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
  const pvp = require('mineflayer-pvp').plugin

  let guardPos = null
  let user = null
  // Assign the given location to be guarded
  function guardArea(pos) {

    guardPos = pos

    // We we are not currently in combat, move to the guard pos
    if (!bot.pvp.target) {
      moveToGuardPos()
    }
  }

  // Cancel all pathfinder and combat
  function stopGuarding() {
    guardPos = null
    bot.pvp.stop()
    bot.pathfinder.setGoal(null)
  }

  // Pathfinder to the guard position
  function moveToGuardPos () {
    const mcData = require('minecraft-data')(bot.version)
    bot.pathfinder.setMovements(new Movements(bot, mcData))
    bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z))
  }

  // Called when the bot has killed it's target.
  bot.on('stoppedAttacking', () => {
    if (guardPos) {
      moveToGuardPos()
    }
  })

  // Check for new enemies to attack
  bot.on('physicsTick', () => {

    if (!guardPos) return // Do nothing if bot is not guarding anything

    const player = bot.players[username]
    if (!player) {
      bot.chat("I can't see you.")
      return
    }

    if (player.entity.position != guardPos) {
      if( player.entity.position.distanceTo(bot.entity.position)>8) {
        guardArea(player.entity.position)
      }
    }
    

    // Only look for mobs within 16 blocks
   // const filter = e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 16 &&
   //                 e.mobType !== 'Armor Stand' // Mojang classifies armor stands as mobs for some reason?

   // const entity = bot.nearestEntity(filter)
   // if (entity) {
      // Start attacking
   //   bot.pvp.attack(entity)
   // }
  })
  bot.on('onCorrelateAttack', function (attacker,victim,weapon) {
    if (weapon) {
      console.log("Entity: "+ (victim.displayName || victim.username ) + " attacked by: " + (attacker.displayName|| attacker.username) + " with: " + weapon.displayName);
      bot.pvp.attack(attacker)

    } else {
      console.log("Entity: "+ (victim.displayName || victim.username ) + " attacked by: " + (attacker.displayName|| attacker.username) );
      bot.pvp.attack(attacker)

    }
  });

  // Listen for player commands
  bot.on('chat', (username, message) => {
    // Guard the location the player is standing
    if (message === 'protect') {
      const player = bot.players[username]
      bot.armorManager.equipAll()

      if (!player) {
        bot.chat("I can't see you.")
        return
      }

      bot.chat('I will protect ' + username)
      guardArea(player.entity.position)
      user = username;
    }

  // Stop guarding
    if (message === 'stop') {
      bot.chat('I will no longer guard this area.')
      stopGuarding()
    }
  })

  return module;
};
