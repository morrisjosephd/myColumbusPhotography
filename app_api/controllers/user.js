//var mongoose = require('mongoose');
//var User = mongoose.model('User');
var rs = require('../services/response-service');

exports.createUser = function(User) {
  return function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
      if (!user) {
        User.create(newUser(req), function(err, newUser) {
          if (err) {
            rs.sendJsonResponse(res, 400, err);
          }
          rs.sendJsonResponse(res, 201, newUser);
        });
      } else {
        var message = {errorMessage: 'Username already exists'};
        rs.sendJsonResponse(res, 409, message);
      }
    });
  }
};

function newUser(req) {
  return {
    username: req.body.username,
    password:  req.body.password
  };
}
