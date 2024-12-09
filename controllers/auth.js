const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const loginUser = async (req, res) => {
  res.send("Login a user");
};

module.exports = { registerUser, loginUser };
