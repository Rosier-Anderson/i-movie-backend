const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  try {
    if (!user || !pwd)
      return res
        .status(400)
        .json({ Erorr: `${user} and ${pwd} are required.` });
    const foundUser = UserModel.findOne({ username: user });
    if (!foundUser) return res.sendStatus(401);
    const matchUser = await bcrypt.compare(pwd, foundUser.pwd);
    if (!matchUser) return res.sendStatus(401);
  } catch (err) {
    res.status(500).json({ msg: err.mesage });
  }
};

module.exports = { handleLogin };
