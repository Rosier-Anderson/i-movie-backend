const mongoose = require("mongoose");
const Schema = mongoose;
const UserModel = new Schema({
  usename: {
    type: String,
    required: true,
  },
});
