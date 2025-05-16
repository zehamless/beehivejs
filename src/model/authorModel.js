const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
})
const Author = mongoose.model('Author', authorSchema, 'author');
module.exports = Author;