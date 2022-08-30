const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const secretKey = dotenv.config().parsed.TOKEN_SECRET_KEY;

const authenticateToken = (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, secretKey, (err, user) => {
    if (err){
      console.log("error = ", err)
      return res.sendStatus(403);
    } 
    req.user = user;
    //console.log("user = ", user);
    res.locals.username = user.username;
    next();
  })
}

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  authenticateToken,
  isAdmin,
  isModerator
};

module.exports = authJwt;