const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const DB = process.env.MONGODB_URI;

require("./config/mongoose.config")(DB);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/uploads", express.static(__dirname + "/uploads"));

// routes
require("./routes/User.routes")(app);
require("./routes/Post.routes")(app);

app.listen(8000, () => {
  console.log("listening on port 8000");
});
