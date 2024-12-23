const { StatusCodes } = require("http-status-codes");
const Cart = require("../models/cart");
const Product = require("../models/product");

const getAllItems = async (req, res) => {
  const cart = await Cart.find({});
  res.status(StatusCodes.OK).json({ cart });
};

const addToCart = async (req, res) => {
  let existingItem;
  const product = await Product.findOne({
    _id: req.params.id,
  });

  let cart = await Cart.findOne({ user_id: req.user.userId });

  if (cart) {
    console.log("Cart Found");
    existingItem = cart?.items.find(
      (item) => item.product_id.toString() === req.params.id
    );
  }
  if (!cart) {
    console.log("Cart Not Found");
    cart = new Cart({ user_id: req.user.userId, items: [] });
    console.log("New Cart Created");
  }

  const price = product.price;

  if (existingItem) {
    // console.log(req.params.id, typeof req.params.id);
    // console.log(cart.items[0].product_id, typeof cart.items[0].product_id);
    cart.items = cart.items.map((item) => {
      if (item.product_id.toString() === req.params.id) {
        return {
          quantity: item.quantity + 1,
          _id: item._id,
          product_id: item.product_id,
          price: item.price,
          sub_total: (item.quantity + 1) * item.price,
        };
      } else {
        return item;
      }
    });
    cart.total_quantity += 1;
    cart.total_price += price;
    // console.log(newItemsArray);
    console.log(cart.items);
    console.log(cart);
  } else {
    let newItem = {
      product_id: req.params.id,
      quantity: 1,
      price: price,
      sub_total: price * 1,
    };
    cart.total_quantity += 1;
    cart.total_price += price;
    cart.items.push(newItem);
  }

  await cart.save(); // Save changes to the database

  res.status(StatusCodes.CREATED).json({ cart });
};

const deleteFromCart = async (req, res) => {
  const cart = await Cart.deleteMany();
  res.status(StatusCodes.OK).json({ cart });
};

const updateQuantity = (req, res) => {
  res.send("Update the quantity");
};

module.exports = {
  addToCart,
  deleteFromCart,
  updateQuantity,
  getAllItems,
};
