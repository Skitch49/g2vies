const router = require("express").Router();
const apiRouter = require("./api");

router.get("/api", (req, res) => {
  res
    .status(200)
    .json(
      "Voici l'ensemble de nos routes /products etc... Pour utilisé swagger aller sur /api-docs"
    );
});

router.use("/api", apiRouter);

module.exports = router;
