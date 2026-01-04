const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  country: { type: String, required: true },
  street: { type: String, required: true },
  building: { type: String },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String },
});

const UsersSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },

    billingAddress: AddressSchema,
    deliveryAddress: AddressSchema,

    stripeCustomerId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UsersSchema);
