const express = require("express");
const router = express.Router();
const db = require('../queries/index.js');

module.exports = (app) => {
  router.post('/api/signin', db.signin);
  router.post('/api/signup', db.signup);
 
  app.use(router);
};