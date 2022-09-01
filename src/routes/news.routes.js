const express = require("express");
const router = express.Router();
const db = require('../queries/index.js');
const {authenticateToken} = require('../middlewares/authJwt');

module.exports = (app) => {
  router.get('/api/news', authenticateToken, db.getNews);
  router.get('/api/news/more', authenticateToken, db.getMoreNews);
 
  app.use(router);
};

