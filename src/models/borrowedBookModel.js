const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowedBookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowedDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    }
});

module.exports = mongoose.model('BorrowedBook', borrowedBookSchema);