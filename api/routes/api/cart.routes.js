const {
  getCart,
  setCart,
  editCart,
  removeFromCart,
  clearCart,
} = require("../../controllers/cart.controller");
const { verifyToken } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, setCart);
router.patch("/update", verifyToken, editCart);
router.delete("/remove/:productId", verifyToken, removeFromCart);
router.delete("/clear", verifyToken, clearCart);

module.exports = router;
