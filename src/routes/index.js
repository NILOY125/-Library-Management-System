const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const borrowRoutes = require("./borrowRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/borrow", borrowRoutes);

module.exports = router;