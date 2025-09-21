const errorHandler = require("../middleware/errorHandler");
const UserModel = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  try {
    if (!user || !pwd)
      return res
        .status(400)
        .json({ Error: "Username and password are required." });
    const duplicate = await UserModel.findOne({ username: user }).exec();
    if (duplicate)
      return res.status(409).json({ msg: `Username ${user} already exits.` });
    const hashPWD = await bcrypt.hash(pwd, 10);
    await UserModel.create({
      username: user,
      password: hashPWD,
    });
    res.status(201).json({ success: "New user created" });
  } catch (err) {
    console.log(err);
    errorHandler(err);
    // res.status(500).json({ msg: err.mesage });
  }
};

module.exports = { handleNewUser };
