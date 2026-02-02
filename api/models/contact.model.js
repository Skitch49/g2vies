const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    object: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", contactSchema);
