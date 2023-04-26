const User = require("../controllers/User.controllers");

module.exports = (app) => {
  app.post("/api/user/register", User.register);
};
