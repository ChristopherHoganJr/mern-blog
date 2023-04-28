const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "you must have a title"],
    },
    summary: {
      type: String,
      required: [true, "you must have a summary"],
    },
    content: {
      type: String,
      required: [true, "you must have content in your post"],
    },
    image: {
      type: String,
      required: [true, "you must have an image"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
