const express = require("express");
const { stripeWebhook } = require("../../controllers/stripe.controller");

const router = express.Router();

// RAW body obligatoire pour Stripe
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

module.exports = router;
