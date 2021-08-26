const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  birthday: {
    type: Date,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
