var mongoose = require('mongoose');

var dbURI = process.env.DEV_DB_URI;

if (isProduction()) {
  //dbURI = process.env.MONGOLAB_URI;
  return console.log(`We don't have a production environment setup yet`);
}

mongoose.connect(dbURI);

var db = mongoose.connection;

db.on('connected', function() {
  if (isProduction()) {
    console.log('Mongoose connected to %s', dbURI);
  }
});

db.on('error', function(err) {
  if (isProduction()) {
    console.log('Mongoose connection error: ' + err);
  }
});

db.on('disconnected', function() {
  if (isProduction()) {
    console.log('Mongoose disconnected');
  }
});

var gracefulShutdown = function(msg, callback) {
  db.close(function() {
    if (isProduction()) {
      console.log('Mongoose disconnected through %s', msg);
    }
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

function isProduction() {
  return process.env.NODE_ENV === 'production';
}
