const { config } = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config();


const ConnectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log("MongoDB Database Connected Successfully"))
  } catch (error) {
    console.error("Error while connecting to Database", error);
  }
}

module.exports = ConnectDB;
