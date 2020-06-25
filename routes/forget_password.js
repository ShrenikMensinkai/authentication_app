const express = require('express');
const router = express.Router();
const { ActionManager } = require('../actions/action_manager');
const { ForgetPassword } = require("../actions/user/forget_password");

router.post('/', function(req, res, next) {
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
