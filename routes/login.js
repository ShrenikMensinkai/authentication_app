let express = require('express');
let router = express.Router();
const { ActionManager } = require('../actions/action_manager');
const { LoginUser } = require("../actions/user/login_user");

router.post("/", function(req,res,next) {
    let email = req.body.email;
    let password = req.body.password;
    let action = new LoginUser(email, password);
    ActionManager.execute(action)
    .then(result => {
        res.send(result)
    }).catch((err)=>{
        res.status(err.status || 400).send(err.message);
    })
 });

module.exports = router;
