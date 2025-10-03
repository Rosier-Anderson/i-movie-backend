const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt) return res.sendStatus(404);
    const refreshToken = cookies.jwt;
    const foundUser = await UserModel.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true, secure: true });
      return res.sendStatus(204);
    }

    foundUser.refreshToken = "";
    foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
};


module.exports = {handleLogout}