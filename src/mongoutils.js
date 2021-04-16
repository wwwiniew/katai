const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/katai_db";

var _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      _db = db.db('katai_db');;
    if (!_db) {
	    console.log("no db");
    }
       var x = _db.collection('contacts');
       if (!x) {
	       console.log('no collection?');
       }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  }
};
