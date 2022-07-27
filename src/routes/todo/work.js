const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("../../../lib/db.js");
const tokenCheck = require("../../middleware/token_validation");
const {isLoggedIn} = require("../../middleware/token_validation");


const tokenRouter = express.Router();
tokenRouter.get('/secret-route', tokenCheck.isLoggedIn, (req, res, next) => {
    console.log(req.userData.userId);
    res.send("맞습니다");
      
  });

tokenRouter.post('/add', tokenCheck.isLoggedIn, (req, res, next) => {
db.query(`INSERT INTO list ( writer, plan, create_at) VALUES (${db.escape(req.userData.userId)}, ${db.escape(req.body.plan)}, now());`,
);
return res.status(200).send({
  isSuccess : true,
  plan: req.body.plan,
  msg: '투두 성공, 토큰이 발급되었습니다',  
});
})

  module.exports = tokenRouter;
