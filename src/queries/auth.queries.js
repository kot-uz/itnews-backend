const writeLog = require('../utils/logger');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const secretKey = dotenv.config().parsed.TOKEN_SECRET_KEY;

function generateAccessToken(username) {
  return jwt.sign(username, secretKey, { expiresIn: '1800s' });
}

const signin = (req, res) => {
  writeLog(req, res, "POST", "/api/signin", "signin");
  const {username, password}  = req.body;
  console.log("password = ", password);
  const token = generateAccessToken({ username });
  res.json(token);
}
module.exports = {
  signin
}