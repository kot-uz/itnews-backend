const writeLog = require('../utils/logger');
const Model = require('../models/news.model');
const { default: axios } = require('axios');

const getNews = async (req, res) => {
  writeLog(req, res, "GET", "/api/news", "getNews");
  try{
    const data = await Model.find();
    res.json(data);
  }
  catch(error){
      res.status(500).json({message: error.message});
  }
}

const getMoreNews = async (req, res) => {
  writeLog(req, res, "GET", "/api/news/more", "getMoreNews");
  const params = {'q': 'Elon Musk' };
  const headers = {
    'X-RapidAPI-Key': 'c4cd4ad84dmsh1640d708360a11ep1efaecjsne9f462d8cbfb',
    'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
  }
  try{
    const data = await axios.get("https://free-news.p.rapidapi.com/v1/search", params, headers);
    console.log("data = ", data);
    res.send("getMoreNews");
  }
  catch(error){
      res.status(500).json({message: error.message});
  }
}

module.exports = {
  getNews,
  getMoreNews
}