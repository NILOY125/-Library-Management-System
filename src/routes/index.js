const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");
const borrowRoutes = require("./borrowRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
// router.use("/books", bookRoutes);
// router.use("/borrow", borrowRoutes);

module.exports = router;