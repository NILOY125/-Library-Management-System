const { borrowBookService, returnBookService, getBorrowHistoryService } = require("../services/borrowService");

exports.borrowBook = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({ status: 400, message: "Book ID is required" });
        }

        const response = await borrowBookService(userId, bookId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({ status: 400, message: "Book ID is required" });
        }

        const response = await returnBookService(userId, bookId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};

// Get Borrowing History (Librarian Only)
exports.getBorrowHistory = async (req, res) => {
    try {
        const response = await getBorrowHistoryService();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};