const { StatusCodes } = require("http-status-codes");
const Order = require("../models/order");
const Cart = require("../models/cart");
const { BadRequestError, NotFoundError } = require("../errors");
const Product = require("../models/product");
const sendEmail = require("../utility/emailService");
const User = require("../models/user");
const getAllOrders = async (req, res) => {
  const orders = await Order.find({ user_id: req.user.userId });
  if (orders.length === 0) {
    throw new NotFoundError(
      "No orders found for you. Please place a new order."
    );
  }
  res.status(StatusCodes.OK).json({ orders });
};

const placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.user.userId });

  if (!cart || cart.items.length === 0) {
    throw new BadRequestError("Please add items to cart");
  }

  for (let i = 0; i < cart.items.length; i++) {
    let productId = cart.items[i].product_id;
    let product = await Product.findOne({ _id: productId });
    if (product.stock >= cart.items[i].quantity) {
      product.stock -= cart.items[i].quantity;
      await product.save();
    } else {
      throw new BadRequestError(
        "This much quantity is not available for this product. Please select less quantity"
      );
    }
  }

  let orderItem = {
    user_id: req.user.userId,
    items: cart.items,
    totalAmount: cart.total_price,
  };

  const order = await Order.create(orderItem);

  const itemDescription = async (items) => {
    const productNames = [];
    for (let i = 0; i < items.length; i++) {
      let product = await Product.findOne({ _id: items[i].product_id });
      productNames.push(product.name);
    }

    return productNames.join(", ");
  };

  const { email } = req.user;
  try {
    const products = await itemDescription(order.items);
    await sendEmail(
      email,
      "Order Placed Successfully",
      `Your order has been placed and here are the details : 
      Total Items: ${cart.items.length},
      Total Amount: ${order.totalAmount},
      Items: ${products}`
    );
  } catch (error) {
    console.error("Failed to send order creation email: ", error.message);
  }

  try {
    const users = await User.find({ role: "admin" });
    const user = await User.findOne({ email: email });
    const products = await itemDescription(order.items);
    const userName = user.name;
    for (let i = 0; i < users.length; i++) {
      let adminEmail = users[i].email;
      await sendEmail(
        adminEmail,
        "Order Placed Successfully",
        `A order has been placed and here are the details : 
        Total Items: ${cart.items.length},
        Total Amount: ${order.totalAmount},
        Items: ${products},
        User: ${userName}`
      );
    }
  } catch (err) {
    console.error(
      "Failed to send order creation email for admin: ",
      err.message
    );
  }
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
