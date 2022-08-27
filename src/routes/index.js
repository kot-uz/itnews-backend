const express = require("express");
const router = express.Router();
const db = require('../queries/index.js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const secretKey = dotenv.config().parsed.TOKEN_KEY;

const authenticateToken = (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, secretKey, (err, user) => {
    if (err){
      console.log("error = ", err)
      return res.sendStatus(403);
    } 
    // If you want to get expiry date - it is in user.exp field
    req.user = user;
    console.log("user = ", user);
    res.locals.username = user.sub;
    next();
  })
}

let routes = (app) => {
  router.get('/api/users',  db.getUsers);

  app.use(router);
};

module.exports = routes;