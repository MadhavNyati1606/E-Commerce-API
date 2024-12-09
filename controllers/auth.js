const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateAuthToken();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all the details");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isEqual = user.comparePassword(password);

  if (!isEqual) {
    throw new UnauthenticatedError("Authorization Invalid");
  }

  const token = user.generateAuthToken();

  res.status(StatusCodes.OK).json({ token });
};

module.exports = { registerUser, loginUser };
