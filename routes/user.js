const express = require("express");
const router = express.Router();
const { getProduct, getAllProducts } = require("../controllers/user");

router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);

module.exports = router;
