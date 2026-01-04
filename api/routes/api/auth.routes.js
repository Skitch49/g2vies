const router = require("express").Router();
const {
  createAuth,
  deleteAuth,
  getAuth,
} = require("../../controllers/auth.controller");

router.post("/", createAuth);

router.delete("/", deleteAuth);

router.get("/current", getAuth);

module.exports = router;
