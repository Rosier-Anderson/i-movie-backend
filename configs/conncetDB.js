const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // DB uri here
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log("We can not connnect to MongoDB!");
    console.log(err);
  }
};

module.exports = connectDB;
