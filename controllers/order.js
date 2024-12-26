const { StatusCodes } = require("http-status-codes");
const Order = require("../models/order");
const Cart = require("../models/cart");
const { BadRequestError } = require("../errors");
const getAllOrders = async (req, res) => {
  const orders = await Order.find({ user_id: req.user.userId });
  res.status(StatusCodes.OK).json({ orders });
};

const placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.user.userId });

  if (!cart || cart.items.length === 0) {
    throw new BadRequestError("Please add items to cart");
  }

  let orderItem = {
    user_id: req.user.userId,
    items: cart.items,
    totalAmount: cart.total_price,
  };

  const order = await Order.create(orderItem);
  res.status(StatusCodes.CREATED).json({ order });
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  if (status === "") {
    throw new BadRequestError("Please enter a value for the status");
  }

  const order = await Order.findOneAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(StatusCodes.OK).json({ order });
};

const getAllOrdersAdmin = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders });
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  placeOrder,
  getAllOrdersAdmin,
};