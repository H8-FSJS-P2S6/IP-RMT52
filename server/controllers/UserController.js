const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "BadRequest", message: "Email tidak boleh kosong" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password tidak boleh kosong" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email or password" };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized", message: "Invalid email or password" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
