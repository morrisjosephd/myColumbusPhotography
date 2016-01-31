/* global define, it, describe, beforeEach, afterEach, expect, assert, require */
require('./../../../app.js');
require('./../../helpers/chai');
require('./../../helpers/db-utils');


var user = require('./../../../app_api/controllers/user');

describe('A user', function() {

  it('can create a new user', function() {
    var credentials = {
      username: 'new-user',
      password: 'some-password'
    };

    var newUser = user.createUser(credentials);

    assert(newUser === `hello new-user, your password is some-password`);
  });

});