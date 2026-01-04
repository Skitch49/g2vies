const router = require("express").Router();
const apiProducts = require("./products.routes");
const apiUsers = require("./users.routes");
const apiAuth = require("./auth.routes");
router.get("/test", (req, res) => {
  res.json("ok !");
});

router.use("/products", apiProducts);
router.use("/users", apiUsers);
router.use("/auth", apiAuth);

module.exports = router;
