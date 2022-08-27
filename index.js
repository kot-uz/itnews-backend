const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require("config");


const app = express();

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const initRoutes = require("./src/routes");
initRoutes(app);

const port = config.get("port");
const logLevel = config.get("logConfig.logLevel");



async function start(){
  try{
    await mongoose.connect('mongodb://localhost:27017/userdb', {
      useNewUrlParser: true
    });

    app.listen(port, () =>{
      console.log("logging level: ", logLevel);
      console.log(`Starting server on port ${port}...`);
    });
  }catch (error){
    console.log(error);
  }
}

start();