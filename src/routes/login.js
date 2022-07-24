const express = require("express");
//const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../../lib/db.js");

// routes/router.js

// localhost:3000/api/login// routes/router.js
const loginRouter = express.Router();
loginRouter.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE id = ${db.escape(req.body.id)};`,
      (err, result) => {
        // user 없음
        // if (err) {
        //   throw err;
        //   return res.status(400).send({
        //     msg: '사용자가 존재하지않습니다'
        //   });
        // }
        if (!result.length) {
          return res.status(401).send({
            msg: 'id가 잘못되었습니다. first' 
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Username or password is incorrect!'
              });
            }
            if (bResult) {
              const token = jwt.sign({
                  username: result[0].username,
                  userId: result[0].id
                },
                'SECRETKEY', {
                  expiresIn: '10m'
                }
              );
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                isSuccess : true,
                username: result[0].username,
                // userId: result[0].id,
                
                msg: '로그인 성공, 토큰이 발급되었습니다',
                token,
                // registerd: result[0].registerd,
                //last_login: result[0].last_login
                
                //user: result[0],
                
              });
            }
            return res.status(401).send({
              msg: 'password가 잘못되었습니다. second'
            });
          }
        );
      }
    );
  });

// localhost:3000/api/secret-route

module.exports = loginRouter;