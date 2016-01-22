var mongoose = require('mongoose');

var dbURI = process.env.DEV_DB_URI;

if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

var db = mongoose.connection;

db.on('connected', function() {
  console.log('Mongoose connected to %s', dbURI);
});

db.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

db.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

var gracefulShutdown = function(msg, callback) {
  db.close(function() {
    console.log('Mongoose disconnected through %s', msg);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

// For Heroku app termintion
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

//require('./locations');