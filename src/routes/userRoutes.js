const express = require("express");
const { createUser, updateUser, getUsers, getUserDetails, deleteUser } = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, authorize("Admin"), createUser);
router.put("/update", authenticate, authorize("Admin"), updateUser);
router.get("/list", authenticate, authorize("Admin"), getUsers);
router.get("/details/:id", authenticate, getUserDetails);
router.delete("/delete/:id", authenticate, authorize("Admin"), deleteUser);

module.exports = router;