const mongoose = require("mongoose");

let Admin = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = Admin = mongoose.model("Admin", Admin);
