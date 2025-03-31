const { CreateBookService, UpdateBookService, GetBookDetailsService, GetBookListService, deleteBookService } = require("../services/bookService");
const Book = require("../models/bookModel");

exports.createBook = async (req, res) => {
    try {
        const response = await CreateBookService(req.body);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    }
};
exports.updateBook = async (req, res) => {
    try {
        const { id, ...updateData } =req.body;
        if(!id) return res.status(400).json({ status:400, message:"Book id is required"});

        // Check Book
        const existingBook = await Book.findById(id);
        if(!existingBook || existingBook.is_deleted) {
            return res.status(404).json({ status:404, message:"Book not found or has been deleted"});
        }

        const response = await UpdateBookService(id, updateData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status:500, message: error.message})
    }
};

exports.getBooks = async (req, res) => {
    try {
        const response = await GetBookListService();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status:500, message: error.message})
    }
};

exports.getbookById = async (req, res) => {
    try {
        const response = await GetBookDetailsService(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status:500, message: error.message})
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const response = await deleteBookService(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ status:500, message: error.message});
    }
}