const logger = require('../utils/logger');
const dotenv = require('dotenv');

  
  // const getUsers = (request, response) => {
  //   const page = request.query.page;
  //   const offset = (+page-1)*100;
  //   const username = response.locals.username;
  //   const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || "unknown IP" ;
  //   logger.info(`IP:${ip}    username:${username}   method:GET   API:/api/users   func:getUsers`);
  //   pool.query("SELECT id, phone,  username, firstname, secondname, lastname, created	FROM addressbook.users ORDER BY id desc LIMIT 100 OFFSET "+offset, 
  //   (error, results)=>{
  //     if (error){
  //       logger.error(error);
  //       response.status(404).send(String(error));
  //     } else {
  //       response.status(200).json(results.rows);
  //     }
  //   }
  //   );
  // }


  const getUsers = (request, response) => {
    console.log("I am here");
    const page = request.query.page;
    const offset = (+page-1)*100;
    const username = response.locals.username;
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || "unknown IP" ;
    logger.info(`IP:${ip}    username:${username}   method:GET   API:/api/users   func:getUsers`);

    response.status(201);
    // //pool.query("SELECT id, phone,  username, firstname, secondname, lastname, created	FROM addressbook.users ORDER BY id desc LIMIT 100 OFFSET "+offset, 
    // (error, results)=>{
    //   if (error){
    //     logger.error(error);
    //     response.status(404).send(String(error));
    //   } else {
    //     response.status(200);
    //   }
    // }
    // );
  }

  module.exports = {
    getUsers
  }