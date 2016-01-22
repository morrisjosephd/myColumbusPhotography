/* global define, it, describe, beforeEach, afterEach, expect, assert, require */
require('./helpers/chai');

var app = require('../app');
var request = require('request');

var testPort = 8000;
var testServer;

describe('App server routing', function () {

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

  it('should return a response code of "404" when a url does not exits', function (done) {
    request.get('http://localhost:8000/badUrl', function (err, res, body) {
      if (err) {}
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

  it('should return a response code of "200" for the home page', function (done) {
    request.get('http://localhost:8000/', function (err, res, body) {
      //  expect(res.statusCode).(404)
      if (err) {}
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

});
