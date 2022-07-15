const express = require("express");
//const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const db = require("../../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const {validateRegister} = require("../middleware/users");
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
          return res.status(409).send({
            msg: 'This username is already in use!'
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
                `INSERT INTO users (id, username, password, registered, uuid) VALUES (${db.escape(req.body.id)}, ${db.escape(
                  req.body.username
                )}, ${db.escape(hash)}, now(), '${uuid.v4()}')`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  return res.status(201).send({
                    msg: 'Registered!'
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
authRouter.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE id = ${db.escape(req.body.id)};`,
      (err, result) => {
        // user 없음
        if (err) {
          throw err;
          return res.status(400).send({
            msg: '사용자가 존재하지않습니다'
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
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
                  expiresIn: '7d'
                }
              );
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
  });
// localhost:3000/api/secret-route
authRouter.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("this is secret content");
    
});

module.exports = authRouter;