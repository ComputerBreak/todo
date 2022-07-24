const express = require("express");
//const router = express.Router();
const jwt = require("jsonwebtoken");
//const uuid = require("uuid"); 

const db = require("../../lib/db.js");
const tokenCheck = require("../middleware/token_validation");
const {isLoggedIn} = require("../middleware/token_validation");
//gg
const tokenRouter = express.Router();
tokenRouter.get('/조회만들까', tokenCheck.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send("몰라");
      
  });

const todoRouter = express.Router();
todoRouter.post('/add', tokenCheck.isLoggedIn, (req, res, next) => {
  db.query()

})

  module.exports = {tokenRouter, todoRouter};

  if(!a.length){
    return res.send
  }