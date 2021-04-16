module.exports = function (bot) {
  var module = {};
  var elizabot = require("./elizabot.js");
  var mongoUtil = require("./mongoutils.js");

  const Contact = require("./contact.js");
  var lastMsg = Date.now()
  const timer = ms => new Promise(res => setTimeout(res, ms));
  console.log('starting chat');
  bot.on("chat", (username, message) => {
    if (username == bot.username) return
    if (Date.now() - lastMsg < 1000) {
      timer(1000).then((res) => {
        console.log("delayed");
        var sem = require('semaphore')(1);
        sem.take(function() {
          chaton(username, message);
          sem.leave();
        });
      });
    } else {
      chaton(username, message);
    }
  });

  function chaton(username, message) {
    lastMsg = Date.now();

    if (!mongoUtil) {
      console.log('no mongoUtil in on chat!');
    }
    var db = mongoUtil.getDb();
    this.contacts = new Contact(db);
    const player = bot.players[username];

    
    //check and see if we have a contact for this user
    var contact = null;
    var flag = false;
    this.contacts.findContact(username).then((result) => {
      contact = result;
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
        this.contacts.addContact(newContact).then(function (response) {
          console.log('added contanct', response._id);
          contact = response;
        });

        bot.chat(elizabot.start());
        return;
      } else {
        
        //update last contacts
        console.log("contact", contact._id);
        if (Date.now() - contact.lastContact < 2000) {
          console.log('too chatty for message '+message);
          return; 
        }
        console.log("Last contact: " + (Date.now() - contact.lastContact ) + ' ' + message);
        this.contacts.sayHello(username).then(_ => console.log('updated time'));
        console.log('found contact updating info');
      }

      if (!player) {
        bot.chat(username + " I can't see you.");
        return;
      }
      //if (contact.nickname == "") {
       // bot.chat("Do you have a nickname?");
       // return;
      //}
      if (!elizabot) {
        console.log("no eliza?");
      }
      if (message === "quit") {
        elizabot.quit();
      }
      console.log('calling eliza with',message);
      
      bot.chat(username + ' ' + elizabot.reply(message));
    });
  };

  return module;
};
