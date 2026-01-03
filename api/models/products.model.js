const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    condition: {
      type: String,
      required: true,
      enum: [
        "Neuf",
        "Comme neuf",
        "Très bon état",
        "Bon état",
        "Usagé",
        "Reconditionné",
      ],
    },

    images: {
      type: [String],
    },
    model: {
      type: String,
    },
    cpu: {
      type: String,
    },
    gpu: {
      type: String,
    },
    ram: {
      type: Number,
    },
    color: {
      type: String,
    },
    weight: {
      type: Number,
    },
    storage: {
      capacity: {
        type: Number,
      },
      unit: { type: String, enum: ["Go", "To"] },
      type: { type: String, enum: ["SSD", "HDD"] },
    },
    screenSize: {
      type: Number,
    },
    operatingSystem: {
      type: String,
    },
    wifi: {
      type: Boolean,
    },
    webcam: {
      type: Boolean,
    },
    numpad: {
      type: Boolean,
    },
    microphone: {
      type: Boolean,
    },
    bluetooth: {
      type: Boolean,
    },
    connectors: [
      {
        quantity: { type: Number },
        name: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productsSchema);
