const express = require("express");
//const router = express.Router();
const jwt = require("jsonwebtoken");
//const uuid = require("uuid"); 

const db = require("../../lib/db.js");
const tokenCheck = require("../middleware/token_validation");
const {isLoggedIn} = require("../middleware/token_validation");
const {todoInsert} = require("../middleware/token_validation");

const tokenRouter = express.Router();
tokenRouter.get('/secret-route', tokenCheck.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send("몰라");
      
  });


 tokenRouter.post('/add', tokenCheck.isLoggedIn, (req, res, next) => {
   db.query(
    `INSERT INTO list (number, writer, plan, create_at) VALUES (1, 2, ${db.escape(req.body.plan)}, now());`,

    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(201).send({
        "isSuccess" : true,
        "code": 201,
        "message": "일정추가 완료 완료되었습니다",
        "plan" : req.body.plan,
      });
    }
   );

})

  module.exports = tokenRouter;

  // SELECT *
  //   FROM (
  //       SELECT * FROM Person WHERE city='서울'    ) P
  //   WHERE name='홍길동';