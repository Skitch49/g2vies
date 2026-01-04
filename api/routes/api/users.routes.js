const express = require("express");
const {
  getUser,
  editUser,
  createUser,
  editPassword,
  getUsers,
} = require("../../controllers/users.controller");
const { verifyAdmin } = require("../../middlewares/admin.middleware");
const { verifyToken } = require("../../middlewares/auth.middleware");

const router = express.Router();

// Public route
router.post("/", createUser);

// Admin route
router.get("/", verifyAdmin, getUsers);

// Protected routes
router.get("/:id", verifyToken, getUser);
router.patch("/:id", verifyToken, editUser);
router.patch("/:id/password", verifyToken, editPassword);

module.exports = router;
