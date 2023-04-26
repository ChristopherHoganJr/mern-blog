const User = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    let email_exist = await User.findOne({ email: req.body.email });
    if (email_exist)
      return res.status(400).json({
        errors: {
          email: {
            message: "this email already exists",
          },
        },
      });
    let username_exist = await User.findOne({ username: req.body.username });
    if (username_exist)
      return res.status(400).json({
        errors: {
          username: {
            message: "this username is already taken",
          },
        },
      });
    if (!email_exist && !username_exist) {
      User.create(req.body)
        .then((user) => {
          const userToken = jwt.sign(
            {
              id: user._id,
            },
            process.env.SECRET_KEY
          );

          res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
              httpOnly: true,
            })
            .json({
              msg: "success!",
              currentUser: { name: user.name, email: user.email },
            });
        })
        .catch((err) => res.status(400).json(err));
    }
  },
};
