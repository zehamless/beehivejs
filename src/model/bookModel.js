const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        minLength: 4,
        maxLength: 4,
        trim: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: false,
    },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;