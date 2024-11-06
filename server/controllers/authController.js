const { User } = require("../models/index");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, username, password, gender } = req.body;
      const user = await User.create({
        email,
        username,
        gender,
        password,
      });

      res.status(201).json({
        username: user.username,
        email: user.email,
        gender: user.gender,
      });
    } catch (error) {
      console.log(error, "======eror disini");
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "LoginEmail" };
      }

      if (!password) {
        throw { name: "LoginPassword" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "LoginError" };
      }

      if (!compare(password, user.password)) {
        throw { name: "LoginError" };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
