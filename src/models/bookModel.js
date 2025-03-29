const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);