const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the user"],
    minlength: 3,
    maxlength: 30,
  },

  email: {
    type: String,
    required: [true, "Please provide a email address for the user"],
    validate: {
      validator: validator.isEmail,
      message: `${this.email} is not a valid email address`,
    },
  },

  password: {
    type: String,
    required: [true, "Please provide a password for the user"],
    minlength: 4,
    maxlength: 14,
  },

  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
});

module.exports = mongoose.model("User", userSchema);
