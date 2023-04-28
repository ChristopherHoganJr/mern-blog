const Post = require("../controllers/Post.controllers");
const { authenticate } = require("../config/jwt.config");

const multer = require("multer");
const imageUpload = multer({ dest: "./uploads/" });

module.exports = (app) => {
  app.get("/api/post", Post.getRecent);
  app.get("/api/post/:post_id", Post.getSinglePost);
  app.post("/api/post/new", imageUpload.single("file"), authenticate, Post.new);
  app.put(
    "/api/post/update/:post_id",
    imageUpload.single("file"),
    authenticate,
    Post.updatePost
  );
};
