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
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(400).json({
        errors: {
          email: {
            message: "this email has not been registered",
          },
        },
      });
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      return res.status(400).json({
        errors: {
          email: {
            message: "this was not the right password",
          },
        },
      });
    }

    const usertoken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("usertoken", usertoken, process.SECRET_KEY, {
        httpOnly: true,
      })
      .json({ id: user._id, username: user.username });
  },
  logout: (req, res) => {
    res.clearCookie("usertoken").sendStatus(200);
  },
  publicProfile: async (req, res) => {
    if (req?.cookies?.usertoken == null)
      return res.status(400).json({ message: "Please log in" });
    else {
      let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);

      User.findById(decoded.id)
        .then((user) => {
          res.status(200).json({
            username: user.username,
          });
        })
        .catch((error) => res.status(400).json({ errors: "please log in" }));
    }
  },
};
