const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");
const { NotFoundError } = require("../errors");

const getAllProducts = async (req, res) => {
  const { category, isFeatured, name, numericFilters, sort } = req.query;
  const queryObject = {};
  const operatorMap = {
    ">=": "$gte",
    ">": "$gt",
    "=": "$eq",
    "<": "$lt",
    "<=": "$lte",
    "!=": "$ne",
  };

  if (numericFilters) {
    const filters = numericFilters
      .split(",")
      .map((item) => item.replace(/([a-zA-Z]+)([<>=!]+)(.+)/, "$1_$2_$3"));
    for (let i = 0; i < filters.length; i++) {
      const [field, operator, value] = filters[i].split("_");
      queryObject[field] = { [operatorMap[operator]]: value };
      console.log(queryObject);
    }
  }

  if (category) {
    queryObject.category = { $regex: category, $options: "i" };
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (isFeatured) {
    queryObject.isFeatured = isFeatured;
  }
  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;
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
