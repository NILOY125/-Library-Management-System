const Books = require("../models/bookModel");

// Create Book
const CreateBookService = async (data) => {
    const book = new Books(data);
    await book.save();
    return { status: 201, message: "Book created successfully" };
};

// Update Book
const UpdateBookService = async (id, data) => {
    const updatedBook = await Books.findByIdAndUpdate(id, data, { new: true });
    return { status: 200, message: "User updated successfully"};
};

// Get Book List
const GetBookListService = async () => {
    const books = await Books.find({ is_deleted: false });
    return { status: 200, message: "Book list", books };
};

// Get Book Details
 const GetBookDetailsService = async (id) => {
    const book = await Books.findOne({ _id: id, is_deleted: false });
    if (!book) {
        throw new Error("Book not found.");
    }
    return { status: 200, message: "Book details", book };
};

// Delete Book
const deleteBookService = async (id) => {
    const book = await Books.findById(id);
    if(!book){
        throw new Error("Book not found.");
    }
    // set is_deleted true
    book.is_deleted = true;
    await book.save();
    return { status: 200, message: "Book deleted successfully" };
};

module.exports = { CreateBookService, UpdateBookService, GetBookListService, GetBookDetailsService, deleteBookService }