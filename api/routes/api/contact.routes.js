const { setContact } = require("../../controllers/contact.controller");

const router = require("express").Router();

// router.get("/", verifyAdmin, getContact);
router.post("/", setContact);

module.exports = router;
