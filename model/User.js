const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  usename: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  // refreshToken: String,
});

module.exports = mongoose.model("User", UserSchema);
