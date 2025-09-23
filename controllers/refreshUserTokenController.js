const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");

const handlerefreshUserToken = async (req, res, next) => {
  try {
    const token = req.cookies;
    if (!token?.jwt) return res.status(401).json({ token });

    const refreshToken = token.jwt;
    const foundUser = await UserModel.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESHTOKEN_TOKEN_SECRET,
      (error, decoded) => {
        if (error || foundUser.username !== decoded.UserInfo.username)
          return res.sendStatus(403);

        const roles = Object.values(foundUser.roles);

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
        res.status(201).json({ accessToken });
      }
    );
  } catch (err) {
    netx(err);
  }
};

module.exports = { handlerefreshUserToken };
