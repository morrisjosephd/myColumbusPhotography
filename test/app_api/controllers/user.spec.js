/* global define, it, describe, beforeEach, afterEach, expect, assert, require */
require('./../../helpers/chai');
require('./../../helpers/db-utils');
var app = require('./../../../app');
var request = require('supertest');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var testPort = process.env.TEST_PORT_NUMBER;
var testServer;
var url = process.env.DEV_API_URL;

var newUserCredentials = {
  username: 'new-user',
  password: 'some-password'
};

describe('Users', function() {

  beforeEach(function (done) {
    testServer = app.listen(testPort, function () {
        done();
      })
      .on('error', function (err) {
        console.log(err);
      });
  });

  afterEach(function () {
    testServer.close();
  });

  it('should save a new account and return it', function(done) {
    request(url)
      .post('users')
      .send(newUserCredentials)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(201);
        expect(res.body.username).to.equal(newUserCredentials.username);
        expect(res.body.password).to.equal(newUserCredentials.password);

        User.findOne({username: newUserCredentials.username}, function(err, newUser) {
          expect(newUser.password).to.equal(newUserCredentials.password);
        });
        done();
      });
  });

  it('should return an error trying to create a duplicate username', function(done) {
    User.create(newUserCredentials, function(err, user){});

    request(url)
      .post('users')
      .send(newUserCredentials)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(409);
        expect(res.body.errorMessage).to.equal('Username already exists');
        done();
      });
  });

});