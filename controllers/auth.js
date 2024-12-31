const {
  StatusCodes,
  HTTP_VERSION_NOT_SUPPORTED,
} = require("http-status-codes");
const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const jwt = require("jsonwebtoken");
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
  const refreshToken = user.generateRefreshToken();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(StatusCodes.OK).json({ token });
};

const refreshUser = async (req, res) => {
  // console.log("REfresh USer method executed");
  const refreshToken = req.cookies.jwt;
  // console.log("Refresh token is: ", refreshToken);

  if (!refreshToken) {
    throw new UnauthenticatedError(
      "Refresh Token not available. Please login again"
    );
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    const newAccessToken = jwt.sign(
      { userId: payload.userId, email: payload.email, role: payload.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.json({ newAccessToken });
  } catch (err) {
    res.status(403).json({ msg: "Invalid Refresh Token" });
  }
};

module.exports = { registerUser, loginUser, refreshUser };
