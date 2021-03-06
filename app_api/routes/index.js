var express = require('express');
var router = express.Router();

var user = require('./../controllers/user');
var home = require('./../controllers/home');

router.get('/', home.getHome);
router.post('/users', user.createUser);

module.exports = router;
