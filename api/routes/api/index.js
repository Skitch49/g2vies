const router = require("express").Router();
const apiProducts = require("./products.routes");
const apiUsers = require("./users.routes");
const apiAuth = require("./auth.routes");
const apiCart = require("./cart.routes");
router.get("/test", (req, res) => {
  res.json("ok !");
});

router.use("/products", apiProducts);
router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/cart", apiCart);

module.exports = router;
