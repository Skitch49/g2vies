const express = require("express");
const {
  setProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/products.controller");
const router = express.Router();

// with skip and limit and sort
router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", setProduct);

router.put("/:id", editProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
