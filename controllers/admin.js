const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ product });
};

const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  let { name, description, price, category, stock } = req.body;

  // Convert price and stock to numbers if they exist
  if (price !== undefined) price = Number(price);
  if (stock !== undefined) stock = Number(stock);

  // Validate inputs
  if (
    name === "" ||
    description === "" ||
    (price !== undefined && (price < 0 || isNaN(price))) ||
    category === "" ||
    (stock !== undefined && (stock < 0 || isNaN(stock)))
  ) {
    throw new BadRequestError(
      "Please enter a value for the fields specified in the body"
    );
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    throw new NotFoundError("Product not found");
  }
  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
