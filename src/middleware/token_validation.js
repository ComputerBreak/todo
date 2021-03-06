const jwt = require("jsonwebtoken");

module.exports = {
isLoggedIn: (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'SECRETKEY');
        req.userData = decoded;
        console.log("user입니다");
        next();
    }
    catch(err) {
    return res.status(400).send({
        message : "유효하지 않은 토큰입니다"
        });
    } next();
  } 
};
 
// if (!req.body.plan || req.body.id.plan < 1) {
//     return res.status(400).send({
//       msg: 'Please enter a id with min. 3 chars'
//     }); 
//   }