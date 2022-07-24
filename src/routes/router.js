const express = require("express");
//const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid"); 

const db = require("../../lib/db.js");
const userMiddleware = require("../middleware/signup.js");
const {validateRegister} = require("../middleware/signup");
const { hash } = require("bcryptjs");

// routes/router.js
const authRouter = express.Router();
authRouter.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(301).send({
            "isSuccess": false, 
            "code" : 301,
            msg: '이 username은 사용중입니다!'
          });
        } else {
          // username 만듫기
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              //  hashed pw => database 추가
              db.query(
                `INSERT INTO users (id, username, password, registered, uuid) VALUES (${db.escape(req.body.id)}, 
                ${db.escape(req.body.username)}, ${db.escape(hash)}, now(), '${uuid.v4()}')`,
                
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
                    "message": "회원가입이 완료되었습니다",
                    "username" : req.body.username,
                    "userid" : req.body.id,
                  });
                }
              );
            }
          });
        }
      }
    );
  });

// localhost:3000/api/login// routes/router.js

// localhost:3000/api/secret-route

module.exports = authRouter;