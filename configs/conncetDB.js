const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // DB uri here
    await mongoose.connect(process.env.URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
