const BadRequestError = require("./bad-request");
const CustomErrorAPI = require("./custom-error");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
  CustomErrorAPI,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
};
