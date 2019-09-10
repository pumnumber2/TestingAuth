const mongoose = require("mongoose");

const CookieDBSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateCreate: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("CookieDB", CookieDBSchema);

module.exports = User;
