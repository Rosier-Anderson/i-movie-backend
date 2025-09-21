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
        .json({ Erorr: `Username and password are required.` });
    const foundUser = await UserModel.findOne({ username: user }).exec();
    if (!foundUser)
      return res.status(401).json({ msg: `User ${user} not found.` });

    const matchPWD = await bcrypt.compare(pwd, foundUser.password);
    if (!matchPWD)
      return res.status(403).json({ Error: "Invalid Credentials!" });

    const roles = Object.values(ROLES_LIST);

    const refreshToken = jwt.sign(
      {
        UserInfo: {
          username: user,
          roles: roles,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ accessToken: accessToken });
  } catch (err) {
    console.log(err);
    errorHandler(err);
    // res.status(500).json({ msg: err.mesage });
  }
};

module.exports = { handleLogin };
