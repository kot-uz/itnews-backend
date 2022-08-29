const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require("config");
const db = require("./src/models");
const Role = db.role;
require('dotenv').config();

const app = express();
const mongoString = process.env.DATABASE_URL;

global.__basedir = __dirname;

function initialFunction() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);

const port = config.get("port");
const logLevel = config.get("logConfig.logLevel");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database connected');
  initialFunction();
});

app.listen(port, () =>{
  console.log("logging level: ", logLevel);
  console.log(`Starting server on port ${port}...`);

});

