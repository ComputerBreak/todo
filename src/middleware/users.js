// middleware/users.js

const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {

    if (!req.body.id || req.body.id < 3) {
      return res.status(400).send({
        msg: 'Please enter a id with min. 3 chars'
      }); 
    }
    
    // username min 3
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: 'Please enter a username with min. 3 chars'
      }); 
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }

    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }

    next();
  },
  isLoggedIn: (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    }
    catch(err) {
    return req.status(400).send({
        message : "유효하지 않은 토큰입니다",
        });
    }
  },
};