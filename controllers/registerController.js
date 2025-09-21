const errorHandler = require("../middleware/errorHandler");
const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  try {
    if (!user || !pwd)
      return res
        .status(400)
        .json({ msg: "Username and password are required." });
    const hashPWD = await bcrypt.hash(pwd, 10);
    await UserModel.create({
      username: user,
      password: hashPWD,
    });
    res.status(201).json({ msg: "New user created" });
  } catch (err) {
    // errorHandler(err);
    console.log(`${err.name}: ${err.message}`);
  }
};

module.exports = { handleNewUser };
