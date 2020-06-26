var express = require('express');
var router = express.Router();
const isAuthorized = require('../util/authorization');
const { ActionManager } = require('../actions/action_manager');
const { AddUser } = require("../actions/user/add_user");

router.get('/', function(req, res, next) {
  res.send("users");
});

router.post('/', function(req, res, next) {
  let user ={
    "name":req.body.name,
    "password" : req.body.password,
    "email" : req.body.email,
    "phoneNo" : req.body.phoneNo
  };
  let action = new AddUser(user);
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});

module.exports = router;
