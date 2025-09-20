const errorHandler = require("../middleware/errorHandler");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  try {
    if (!user || !pwd)
      return res
        .status(400)
        .jon({ msg: "Username and password are required." });
    const hashPWD = await bcrypt.hash(pwd, 10);
  } catch (err) {
    errorHandler(err);
    console.log(`${err.name}: ${err.message}`);
  }
};

module.exports = handleNewUser;
