const User = require("../controllers/User.controllers");

module.exports = (app) => {
  app.post("/api/user/register", User.register);
  app.post("/api/user/login", User.login);
  app.get("/api/user/logout", User.logout);
  app.get("/api/user/publicProfile", User.publicProfile);
};
