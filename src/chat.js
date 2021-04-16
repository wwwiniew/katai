module.exports = function (bot) {
  var module = {};
  var elizabot = require("./elizabot.js");
  var mongoUtil = require("./mongoutils.js");
  
  const Contact = require("./contact.js");

  bot.on("chat", (username, message) => {
	  if (username == bot.username) return

	  if (!mongoUtil) {
		  console.log('no mongoUtil in on chat!');
	  }
    var db = mongoUtil.getDb();	  
    this.contacts = new Contact(db);
    const player = bot.players[username];

    if (!player) {
      bot.chat("I can't see you.");
      return;
    }
    //check and see if we have a contact for this user
    var contact = this.contacts.findContact(username);
    if (!contact) {
	    console.log('cannot find contact in db');
      // otherwise lets create one
      var newContact = {
        username: username,
        player: player,
        lastContact: new Date(),
        nickname: "",
        master: false
      };
      contact = this.contacts.addContact(newContact);
      bot.replay(elizabot.start());
      return;
    } else {
      //update last contacts
      console.log("contact", contact);
      this.contacts.sayHello(username);
      console.log('found contact updating info');
    }

    if (contact.username === "") {
      bot.chat("Do you have a nickname?");
    }
	  if (!elizabot) {
		  console.log("no eliza?");
	  }
    if (message === "quit") {
      elizabot.quit();
    }
    
    bot.chat(elizabot.reply(message));
  });

  return module;
};
