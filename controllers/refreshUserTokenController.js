const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");

const handlerefreshUserToken = async (req, res, next) => {
  const token = req.cookies;
console.log(token?.jwt)
  try {
    if (!token?.jwt) return res.sendStatus(401);

    const refreshToken = token.jwt;

    const foundUser = await UserModel.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403);
  
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || foundUser.username !== decoded.UserInfo.username)
          return res.sendStatus(403);

        const roles = Object.values(foundUser.roles);

        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.UserInfo.username,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.status(201).json({ accessToken });
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { handlerefreshUserToken };
