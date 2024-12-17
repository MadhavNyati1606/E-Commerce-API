const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");
const { NotFoundError } = require("../errors");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`Product with id ${productId} not found`);
  }

  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  getAllProducts,
  getProduct,
};
