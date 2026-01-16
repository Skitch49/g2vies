const express = require("express");
const {
  setProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
  getBrandsAndCategories,
  getSimilarProducts,
} = require("../../controllers/products.controller");
const { verifyAdmin } = require("../../middlewares/admin.middleware");

const router = express.Router();

// with skip and limit and sort
router.get("/", getProducts);

router.get("/brandsAndCategories", getBrandsAndCategories);

router.get("/similarProduct/:id", getSimilarProducts);

router.get("/:id", getProduct);

// Admin routes
router.post("/", verifyAdmin, setProduct);

router.patch("/:id", verifyAdmin, editProduct);

router.delete("/:id", verifyAdmin, deleteProduct);

module.exports = router;
