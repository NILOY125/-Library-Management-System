const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowedBookSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    borrowedAt: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["borrowed", "returned"],
        default: "borrowed"
    },
}, { timestamps: true });

module.exports = mongoose.model('BorrowedBook', borrowedBookSchema);