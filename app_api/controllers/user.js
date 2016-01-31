var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.createUser = function(user) {
  return `hello ${user.username}, your password is ${user.password}`;
};