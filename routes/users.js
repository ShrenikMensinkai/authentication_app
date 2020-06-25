var express = require('express');
var router = express.Router();
const isAuthorized = require('../util/authorization');
const { ActionManager } = require('../actions/action_manager');


router.get('/', function(req, res, next) {
  res.send("users");
});

module.exports = router;
