var express = require('express');
var router = express.Router();
var welcome = require('./controllers/welcome');

module.exports = router;

router.get('/', welcome.index);