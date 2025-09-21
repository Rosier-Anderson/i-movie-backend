const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");
const errorHandler = require("../middleware/errorHandler");
const ROLES_LIST = require("../configs/role_list");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  try {
    if (!user || !pwd)
      return res
        .status(400)
        .json({ Erorr: `${user} and ${pwd} are required.` });
    const foundUser = UserModel.findOne({ username: user });
    if (!foundUser)
      return res.status(401).json({ msg: `User ${user} not found.` });

    const matchPWD = await bcrypt.compare(foundUser.pwd, pwd);
    if (!matchPWD)
      return res.status(403).json({ Error: "Invalid Credentials!" });

    const roles = Object.values(ROLES_LIST);
    const accessToken = process.env.ACCESS_TOKEN_SECRET;
    const refreshToken = process.env.REFRESH_TOKEN_SECRET;
  } catch (err) {
    errorHandler(err);
    res.status(500).json({ msg: err.mesage });
  }
};

module.exports = { handleLogin };
