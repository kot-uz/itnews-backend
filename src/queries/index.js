const logger = require('../utils/logger');
const dotenv = require('dotenv');

const Model = require('../model/model');

  
  // const getUsers = (req, res) => {
  //   const page = req.query.page;
  //   const offset = (+page-1)*100;
  //   const username = res.locals.username;
  //   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || "unknown IP" ;
  //   logger.info(`IP:${ip}    username:${username}   method:GET   API:/api/users   func:getUsers`);
  //   pool.query("SELECT id, phone,  username, firstname, secondname, lastname, created	FROM addressbook.users ORDER BY id desc LIMIT 100 OFFSET "+offset, 
  //   (error, results)=>{
  //     if (error){
  //       logger.error(error);
  //       res.status(404).send(String(error));
  //     } else {
  //       res.status(200).json(results.rows);
  //     }
  //   }
  //   );
  // }


  const getUsers = async (req, res) => {
    const username = res.locals.username;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || "unknown IP" ;
    logger.info(`IP:${ip}    username:${username}   method:GET   API:/api/users   func:getUsers`);
    try{
      const data = await Model.find();
      res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
  }

  const getUser = async (req, res) => {
    const {id} = req.params;
    const username = res.locals.username;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || "unknown IP" ;
    logger.info(`IP:${ip}    username:${username}   method:GET   API:/api/users/:id   func:getUser`);    
    try{
      const data = await Model.findById(id);
      res.json(data);
    }
    catch(error){
      res.status(500).json({message: error.message});
    }
  }

  const addUser = async (req, res) => {
    const {name, age}  = req.body;
    const data = new Model({
        name,
        age
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  }

  const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  }

  module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser
  }