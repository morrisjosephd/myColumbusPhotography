var mongoose = require('mongoose');
require('dotenv').config();

console.log(`I'm in the ${__filename} file`);
console.log(`The mongoose connections string is ${process.env.DEV_DB_URI}`);
var DB_URI = process.env.DEV_DB_URI;

beforeEach(function(done) {

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(DB_URI, function(err) {

      if (err) {
        console.log(`Houston we have a connection err ${err}`);
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }

});

afterEach(function(done) {
  mongoose.disconnect();
  return done();
});