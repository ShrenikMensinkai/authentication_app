var express = require('express');
var router = express.Router();
const isAuthorized = require('../util/authorization');
const { ActionManager } = require('../actions/action_manager');
const { ResetPassword } = require("../actions/user/reset_password");
const { ForgetPassword } = require("../actions/user/forget_password");

router.post('/resetpassword', isAuthorized, function(req, res, next) {
  let old_password = req.body.old_password;
  let new_password = req.body.new_password;
  let email = req.body.email;
  let action = new ResetPassword(old_password, new_password, email);
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});


router.post('/forgetpassword', function(req, res, next) {
  let email = req.body.email;
  let action = new ForgetPassword(email);
  ActionManager.execute(action)
  .then(result => {
      res.send(result)
  }).catch((err)=>{
      res.status(err.status || 400).send(err.message);
  })
});
module.exports = router;
