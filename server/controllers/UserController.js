const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

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
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
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

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { email, name } = ticket.getPayload();

      let user = await User.findOne({ where: { email } });
      if (!user) {
        user = await User.create(
          {
            username: name,
            email,
            password: "Login dari Google",
          },
          {
            hooks: false,
          }
        );
      }
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
