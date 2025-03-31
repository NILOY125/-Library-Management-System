const Borrow = require("../models/borrowedBookModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

// Borrow a Book
const borrowBookService = async (userId, bookId) => {
    const book = await Book.findOne({ _id: bookId, is_deleted: false });

    if (!book) {
        throw new Error("Book not found or has been deleted.");
    }

    // Check if the book is already borrowed
    const existingBorrow = await Borrow.findOne({ book: bookId, status: "borrowed" });
    if (existingBorrow) {
        throw new Error("Book is already borrowed.");
    }

    // Set borrow duration (e.g., 14 days)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrow = new Borrow({
        book: bookId,
        user: userId,
        dueDate,
    });

    await borrow.save();

    return { status: 200, message: "Book borrowed successfully", borrow };
};

// Return a Book
const returnBookService = async (userId, bookId) => {
    const borrowRecord = await Borrow.findOne({ book: bookId, user: userId, status: "borrowed" });

    if (!borrowRecord) {
        throw new Error("No active borrowing record found.");
    }

    borrowRecord.status = "returned";
    borrowRecord.returnedAt = new Date();
    await borrowRecord.save();

    return { status: 200, message: "Book returned successfully", borrowRecord };
};

// Get Borrowing History (Librarian)
const getBorrowHistoryService = async () => {
    const history = await Borrow.find().populate("book").populate("user");
    return { status: 200, message: "Borrowing history retrieved", history };
};

module.exports = { borrowBookService, returnBookService, getBorrowHistoryService };
