var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var user = require('./../controllers/user')(User);
var home = require('./../controllers/home');

router.get('/', home.getHome);
router.post('/users', user.createUser);

module.exports = router;
