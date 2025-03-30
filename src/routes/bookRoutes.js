const express = require('express');
const { createBook, updateBook, getBooks, getbookById, deleteBook } = require("../controllers/bookController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authenticate, authorize("Admin"), createBook);
router.put("/update", authenticate, authorize("Admin"), updateBook);
router.get("/list", authenticate, authorize("Librarian", "Member"), getBooks);
router.get("/details/:id", authenticate, authorize("Librarian", "Member"), getbookById);
router.delete("/delete/:id", authenticate, authorize("Admin"), deleteBook);

module.exports = router;