const express = require("express");
const {
  getAllOrders,
  updateOrderStatus,
  placeOrder,
  getAllOrdersAdmin,
} = require("../controllers/order");
const router = express.Router();
const tokenAuthorization = require("../middleware/token-auth");
const adminTokenAuthorization = require("../middleware/adminTokenAuthorization");
router
  .route("/user")
  .get(tokenAuthorization, getAllOrders)
  .post(tokenAuthorization, placeOrder);

router
  .patch("/admin/:id", adminTokenAuthorization, updateOrderStatus)
  .get("/admin", adminTokenAuthorization, getAllOrdersAdmin);

module.exports = router;
