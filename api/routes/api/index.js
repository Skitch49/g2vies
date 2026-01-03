const router = require("express").Router();
const apiProducts = require("./products.routes");
router.get("/test", (req, res) => {
  res.json("ok !");
});

router.use("/products", apiProducts);

module.exports = router;
