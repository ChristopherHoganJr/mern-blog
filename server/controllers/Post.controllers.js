const Post = require("../models/Post.models");
const User = require("../models/User.models");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

module.exports = {
  getRecent: async (req, res) => {
    await Post.find()
      .populate({ path: "author", select: "username" })
      .sort({ createdAt: -1 })
      .limit(10)
      .then((posts) => res.status(200).json(posts));
  },
  new: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);

    await User.findById(decoded.id)
      .then((user) => {
        console.log(req.body);
        const { originalname, path } = req.file;
        const { title, summary, content } = req.body;
        const splitImageName = originalname.split(".");
        const ext = splitImageName[splitImageName.length - 1];
        const imageFile = path + "." + ext;
        fs.renameSync(path, imageFile);
        Post.create({
          title,
          summary,
          content,
          image: imageFile,
          author: user._id,
        });
      })
      .catch((error) => res.status(400).json(error));

    return res.status(200).json(req.file);
  },
  getSinglePost: async (req, res) => {
    await Post.findById(req.params.post_id)
      .populate({ path: "author", select: "username" })
      .then((post) => res.status(200).json(post))
      .catch((err) => console.log(err));
  },
  updatePost: async (req, res) => {
    console.log(req.params.post_id);
    console.log(req.file);
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    console.log(decoded);
    if (decoded.id) {
      await User.findById(decoded.id)
        .then((user) => {
          if (String(user._id) === req.body.author_id) {
            if (req.file !== undefined) {
              const { originalname, path } = req.file;
              const splitImageName = originalname.split(".");
              const ext = splitImageName[splitImageName.length - 1];
              const imageFile = path + "." + ext;
              fs.renameSync(path, imageFile);
              Post.findByIdAndUpdate(
                req.params.post_id,
                {
                  title: req.body.title,
                  summary: req.body.summary,
                  content: req.body.content,
                  image: imageFile,
                  author: user._id,
                },
                {
                  new: true,
                  runValidators: true,
                }
              )
                .then((post) => res.status(200).json(post))
                .catch((err) => console.log(err));
            } else {
              Post.findByIdAndUpdate(
                req.params.post_id,
                {
                  title: req.body.title,
                  summary: req.body.summary,
                  content: req.body.content,
                  image: req.body.image,
                  author: user._id,
                },
                {
                  new: true,
                  runValidators: true,
                }
              )
                .then((post) => res.status(200).json(post))
                .catch((err) => console.log(err));
            }
          }
        })
        .catch((err) => console.log(err));
    }
  },
};
