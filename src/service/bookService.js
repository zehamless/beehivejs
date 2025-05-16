const Book = require('../model/bookModel');

const getAllBooks = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const [books, total] = await Promise.all([
            Book.find().skip(skip).limit(limit),
            Book.countDocuments()
        ]);
        return {
            status: 200,
            data: books,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        return {status: 500, message: 'Error fetching books'};
    }
};

const getBookById = async (id) => {
    try {
        const book = await Book.findById(id);
        if (!book) return {status: 404, message: 'Book not found'};
        return {status: 200, data: book};
    } catch (error) {
        return {status: 500, message: 'Error fetching book'};
    }
};

const createBook = async (bookData) => {
    try {
        const book = new Book(bookData);
        await book.save();
        return {status: 201, data: book};
    } catch (error) {
        return {status: 500, message: 'Error creating book'};
    }
};

const updateBook = async (id, bookData) => {
    try {
        const book = await Book.findByIdAndUpdate(id, bookData, {new: true});
        if (!book) return {status: 404, message: 'Book not found'};
        return {status: 200, data: book};
    } catch (error) {
        return {status: 500, message: 'Error updating book'};
    }
};

const deleteBook = async (id) => {
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) return {status: 404, message: 'Book not found'};
        return {status: 200, message: 'Book deleted successfully'};
    } catch (error) {
        return {status: 500, message: 'Error deleting book'};
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};