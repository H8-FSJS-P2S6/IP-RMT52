const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = async function authentication(req, res, next) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return next({ name: "Unauthorized", message: "Invalid token" });
  }

  const [, token] = bearerToken.split(" ");
  if (!token) {
    return next({ name: "Unauthorized", message: "Invalid token" });
  }

  try {
    const data = verifyToken(token);
    const user = await User.findByPk(data.id);
    if (!user) {
      return next({ name: "Unauthorized", message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
