const jwt = require("jsonwebtoken");

module.exports = {
isLoggedIn: (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'SECRETKEY');
        req.userData = decoded;
        next();
    }
    catch(err) {
    return res.status(400).send({
        message : "유효하지 않은 토큰입니다"
        });
    } next();
  } 
};