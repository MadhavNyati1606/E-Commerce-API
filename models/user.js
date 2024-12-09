const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
    unique: true,
    trim: true,
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

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(this.password, password);
  return isMatch;
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { userId: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

module.exports = mongoose.model("User", userSchema);
