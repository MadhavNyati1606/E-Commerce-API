const { StatusCodes } = require("http-status-codes");
const { CustomErrorAPI } = require("../errors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    console.log(err);
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong. Please try again." });
};

module.exports = errorHandler;
