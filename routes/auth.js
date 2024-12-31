const express = require("express");
const router = express.Router();
const { registerUser, loginUser, refreshUser } = require("../controllers/auth");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshUser);

module.exports = router;
