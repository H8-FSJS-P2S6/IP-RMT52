const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const CLIENT_ID = process.env.CLIENT_ID;

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

module.exports = class UserController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    if (!email) {
      next({ name: "BadRequest", message: "Email is required" });
      return;
    }
    if (!password) {
      next({ name: "BadRequest", message: "Password is required" });
      return;
    }

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        next({ name: "Unauthorized", message: "Invalid email" });
        return;
      }
      const passwd = comparePassword(password, user.password);
      if (!passwd) {
        next({ name: "Unauthorized", message: "Invalid password" });
        return;
      }
      const access_token = signToken({ id: user.id });
      res.status(200).json({
        access_token,
        userId: user.id,
      });
    } catch (err) {
      console.log(err, "<<< err login");
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: CLIENT_ID,
      });
      const { email, name } = ticket.getPayload();
      const user = await User.findOne({ where: { email } });
      if (!user) {
        await User.create(
          {
            name,
            email,
            password: "123456",
            role: "user",
          },
          {
            hooks: false,
          }
        );
      }
      const access_token = signToken({ id: user.id });
      res.json({ access_token });
    } catch (err) {
      console.log(err, "<<< err googleLogin");
      next(err);
    }
  }

  static async register(req, res, next) {
    const { username, email, password, role } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
        role: "user",
      });
      res.status(201).json({
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      console.log(err, "<<< err googleLogin");
      next(err);
    }
  }
};
