const express = require("express");
const { verifyToken } = require("../../middlewares/auth.middleware");
const {
  createCheckoutSession,
} = require("../../controllers/stripe.controller");
const router = express.Router();

router.post("/create-checkout-session", verifyToken, createCheckoutSession);

module.exports = router;
