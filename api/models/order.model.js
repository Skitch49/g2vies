const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],

    totalPrice: { type: Number, required: true },

    stripeSessionId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["paid", "pending", "cancelled"],
      default: "paid",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
