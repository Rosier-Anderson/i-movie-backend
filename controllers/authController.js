const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");

const handleAuthUser = async (req, res) => {
  const { user, pwd } = req.body;

  try {
    return res.status(400).json({ Erorr: `${user} and ${pwd} is required.` });
  } catch (err) {
    res.status(500).json({ msg: err.mesage });
  }
};
