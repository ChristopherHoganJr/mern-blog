const mongoose = require("mongoose");
module.exports = (DB) => {
  mongoose
    .connect(DB)
    .then(() => console.log(`connected to ${DB}`))
    .catch((err) => console.log(`cannot connec to ${DB}`));
};
