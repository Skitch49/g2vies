const router = require("express").Router();
const apiProducts = require("./products.routes");
const apiUsers = require("./users.routes");
const apiAuth = require("./auth.routes");
const apiCart = require("./cart.routes");
const apiContact = require("./contact.routes");
const apiStripe = require("./stripe.routes");

router.get("/test", (req, res) => {
  res.json("ok !");
});

router.use("/products", apiProducts);
router.use("/users", apiUsers);
router.use("/auth", apiAuth);
router.use("/cart", apiCart);
router.use("/contact", apiContact);
router.use("/stripe", apiStripe);

module.exports = router;
