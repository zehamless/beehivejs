const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../service/bookService');

const getBooks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getAllBooks(page, limit);
    res.status(result.status).json(result);
};

const getBook = async (req, res) => {
    const {id} = req.params;
    const result = await getBookById(id);
    res.status(result.status).json(result);
};

const addBook = async (req, res) => {
    const result = await createBook(req.body);
    res.status(result.status).json(result);
};

const editBook = async (req, res) => {
    const {id} = req.params;
    const result = await updateBook(id, req.body);
    res.status(result.status).json(result);
};

const removeBook = async (req, res) => {
    const {id} = req.params;
    const result = await deleteBook(id);
    res.status(result.status).json(result);
};

module.exports = {
    getBooks,
    getBook,
    addBook,
    editBook,
    removeBook,
};