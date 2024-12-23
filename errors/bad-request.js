const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./custom-error");

class BadRequestError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
