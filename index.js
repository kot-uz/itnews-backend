const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require("config");
const dotenv = require('dotenv');
require('dotenv').config();


const app = express();
const mongoString = process.env.DATABASE_URL;

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const initRoutes = require("./src/routes");
initRoutes(app);

const port = config.get("port");
const logLevel = config.get("logConfig.logLevel");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database connected');
});

app.listen(port, () =>{
  console.log("logging level: ", logLevel);
  console.log(`Starting server on port ${port}...`);

});

