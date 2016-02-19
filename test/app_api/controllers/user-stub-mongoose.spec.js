//require('./../../../app_api/models/user');
require('./../../../app_api/models/user');
var mongoose = require('mongoose');

var rs = require('./../../../app_api/services/response-service');
var sinon = require('sinon');
var rewire = require('rewire');


var userController = rewire('./../../../app_api/controllers/user');
console.log(userController);
var UserMock = {};

before(function() {
  userController.__set__({
    'User': UserMock
  });
});

after(function(done) {
  //mongoose.model = {};
  mongoose.modelSchemas = {};
  done();
});


describe('user controller', function() {
  it('findOne returns a new user and returns error message', function() {
    var req = {
      body : {
        username: 'jmorris',
        password: 'brody'
      }
    };
    var res = {};
    var foundUser = {
      username: 'jmorris',
      password: 'brody'
    };
    var rs = {sendJsonResponse: sinon.spy()};
    var nextStub = sinon.stub();

    UserMock.findOne = sinon.stub().callsArgWith(1, {username: 'jmorris'}, null, foundUser);
    UserMock.create = sinon.spy();
    //var spy = sinon.spy('UserMock', create);
    userController.createUser(req, res, nextStub);
    console.log(UserMock.create.callCount());

    //rs.sendJsonResponse.calledWith(res, 410, {errorMessage: 'Username already exists'});

  });
  it('findOne does not find a new user and saves a new user');
});