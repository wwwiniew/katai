module.exports = function (bot) {
  var module = {};

  var elizabot = require("./elizabot.js");
  var initial = elizabot.start();
  var mongoUtil = require("mongoUtil");
  var db = mongoUtil.getDb();
  const Contact = require("Contact");

  db.collection("users").find();
  console.log(initial);

  bot.on("chat", (username, message) => {
    this.contacts = new Contact();
    const player = bot.players[username];

    if (!player) {
      bot.chat("I can't see you.");
      return;
    }
    //check and see if we have a contact for this user
    var contact = this.contact.findOne(username);
    if (!contact) {
      // otherwise lets create one
      var newContact = {
        username: username,
        player: player,
        lastContact: new Date(),
        nickname: "",
        master: false
      };
      contact = this.contacts.addContact(newContact);
    } else {
      //update last contact
      this.contacts.sayhello(username);
    }

    if (contact.username === "") {
      bot.chat("Do you have a nickname?");
    }
    if (message === "quit") {
      elizabot.quit();
    }

    bot.chat(elizabot.reply(message));
  });

  return module;
};
