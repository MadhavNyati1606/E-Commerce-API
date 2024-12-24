const express = require("express");
const {
  getAllOrders,
  updateOrderStatus,
  placeOrder,
} = require("../controllers/order");
const router = express.Router();
const tokenAuthorization = require("../middleware/token-auth");
const adminTokenAuthorization = require("../middleware/adminTokenAuthorization");
router.route("/").get(getAllOrders).post(placeOrder);

// router.patch("/:id", adminTokenAuthorization, updateOrderStatus);

module.exports = router;
