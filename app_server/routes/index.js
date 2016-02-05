var express = require('express');
var router = express.Router();
var getHome = require('./home/getHome');

router.get('/', getHome);

module.exports = router;
