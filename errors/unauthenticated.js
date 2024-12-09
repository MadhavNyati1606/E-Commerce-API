const CustomErrorAPI = require("./custom-error");

class UnauthenticatedError extends CustomErrorAPI {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = UnauthenticatedError;
