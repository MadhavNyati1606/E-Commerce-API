const CustomErrorAPI = require("./custom-error");

class BadRequestError extends CustomErrorAPI {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = BadRequestError;
