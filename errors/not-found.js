const CustomErrorAPI = require("./custom-error");

class NotFoundError extends CustomErrorAPI {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = NotFoundError;
