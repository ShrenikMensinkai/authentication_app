const jwt = require('jsonwebtoken');
const httperror = require('http-errors');
const config = require('./secret');

function isAuthorized(req, res, next) {
  let token = req.headers['authorization'];
  if (!token)
    throw new httperror(403, `Unauthorized`);
    jwt.verify(token,config.secret, function(err, decoded) {
    if (err)
      throw new httperror(403, `Unauthorized`);
    req.body.email = decoded.email;
    next();
  });
}
module.exports = isAuthorized;