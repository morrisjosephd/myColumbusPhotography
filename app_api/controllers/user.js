var mongoose = require('mongoose');
//var User = mongoose.model('User');

exports.createUser = function(username, password) {
  return `hello ${username}, your password is ${password}`;
};