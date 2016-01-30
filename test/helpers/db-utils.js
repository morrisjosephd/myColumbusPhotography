var mongoose = require('mongoose');
require('dotenv').config();

var DB_URI = process.env.DEV_DB_URI;

beforeEach(function(done) {
  process.env.NODE_ENV = 'test';

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
  // fixes OverwriteModelError: Cannot overwrite `<model name>` model once compiled.
  // with mocha watch
  mongoose.models = {};
  mongoose.modelSchemas = {};
  return done();
});
