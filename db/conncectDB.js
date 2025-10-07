const mongoose = require("mongoose");
require("dotenv").config(); // .env's
const connectDB = async () => {
  try {
    // DB uri here

    await mongoose.connect(process.env.DATABASE_URI);

  } catch (err) {
    console.log("We can not connnect to MongoDB!");
    console.log(err);
  }
};

module.exports = connectDB;
