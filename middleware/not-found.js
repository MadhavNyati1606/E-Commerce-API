const notFound = (req, res, next) => {
  return res.status(404).json({ message: "The route does not exist." });
};

module.exports = notFound;
