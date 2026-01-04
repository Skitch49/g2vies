const express = require("express");
const {
  getUser,
  editUser,
  createUser,
  editPassword,
  getUsers,
} = require("../../controllers/users.controller");
const { verifyToken } = require("../../controllers/auth.controller");

const router = express.Router();

// Public route
router.post("/", createUser);

// Admin route
router.get("/", verifyToken, getUsers);
// Protected routes
router.get("/:id", verifyToken, getUser);
router.patch("/:id", verifyToken, editUser);
router.patch("/:id/password", verifyToken, editPassword);

module.exports = router;
