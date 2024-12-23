const express = require("express");
const {
  addToCart,
  deleteFromCart,
  updateQuantity,
  getAllItems,
  reduceQuantity,
} = require("../controllers/cart");
const router = express.Router();

router.route("/").get(getAllItems).delete(deleteFromCart);
router
  .route("/:id")
  .post(addToCart)
  .delete(deleteFromCart)
  .patch(reduceQuantity);

module.exports = router;
