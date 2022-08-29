const express = require("express");
const router = express.Router();
const db = require('../queries/index.js');
const {authenticateToken} = require('../middlewares/authJwt');

module.exports = (app) => {
  router.get('/api/users', authenticateToken, db.getUsers);
  router.get('/api/users/:id', authenticateToken, db.getUser);
  router.post('/api/users/add', authenticateToken, db.addUser);
  router.patch('/api/users/update/:id', authenticateToken, db.updateUser);
  router.delete('/api/users/delete/:id', authenticateToken, db.deleteUser);

  app.use(router);
};

