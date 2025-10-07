const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { logger } = require("../middleware/logEvents");
const handleNewUser = async (req, res, next) => {
  let { user, pwd } = req.body;

  try {
      
    // Sanitize username: remove unwanted spaces and characters
    user = validator.trim(user);
    user = validator.escape(user);

    // Validate password strength
    // At least 8 chars, one lowercase, one uppercase, one number, one special char
    if (
      !validator.isStrongPassword(pwd, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        msg: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

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
    logger(req, res, next)
    console.log(err);
    next(err);
  }
};

module.exports = { handleNewUser };
