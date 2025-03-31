const express = require("express");
const { borrowBook, returnBook, getBorrowHistory } = require("../controllers/borrowController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Member can borrow books
router.post("/borrow", authenticate, authorize("Member"), borrowBook);

// Member can return books
router.post("/return", authenticate, authorize("Member"), returnBook);

// Librarian can view borrowing history
router.get("/history", authenticate, authorize("Librarian"), getBorrowHistory);

module.exports = router;
