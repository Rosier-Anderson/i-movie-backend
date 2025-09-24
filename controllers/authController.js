const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");
const ROLES_LIST = require("../configs/role_list");
const validator = require("validator");
const handleLogin = async (req, res, next) => {
  let { user, pwd } = req.body;

  try {
    // Sanitize username: remove unwanted spaces and characters
    user = validator.trim(user);
    user = validator.escape(user);

    if (!user || !pwd)
      return res
        .status(400)
        .json({ error: `Username and password are required.` });
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
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { handleLogin };
