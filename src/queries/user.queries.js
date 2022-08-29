const writeLog = require('../utils/logger');
const Model = require('../models/user.model');

const getUsers = async (req, res) => {
  writeLog(req, res, "GET", "/api/users", "getUsers");
  try{
    const data = await Model.find();
    res.json(data);
  }
  catch(error){
      res.status(500).json({message: error.message});
  }
}

const getUser = async (req, res) => {
  writeLog(req, res, "GET", "/api/users/:id", "getUser");
  const {id} = req.params;
  try{
    const data = await Model.findById(id);
    res.json(data);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}

const addUser = async (req, res) => {
  writeLog(req, res, "GET", "/api/users/add", "addUser");
  const {id} = req.params;
  // const {username, age}  = req.body;
  const data = new Model(req.body);
  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
  }
  catch (error) {
      res.status(400).json({message: error.message})
  }
}

const updateUser = async (req, res) => {
  writeLog(req, res, "PATCH", "/api/users/update/:id", "updateUser");
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

const deleteUser = async (req, res) => {
  writeLog(req, res, "DELETE", "/api/users/delete/:id", "deleteUser");
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id)
    res.send(`User with name '${data.name}' has been deleted..`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
}