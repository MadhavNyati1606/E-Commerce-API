const notFound = (req, res, next) => {
  return res.status(404).send("The route does not exist.");
};

module.exports = notFound;
