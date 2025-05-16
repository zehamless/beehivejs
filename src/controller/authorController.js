const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../service/authorService');

const getAuthors = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await getAllAuthors(page, limit);
    res.status(result.status).json(result);
};

const getAuthor = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    const result = await getAuthorById(id);
    res.status(result.status).json(result);
};

const addAuthor = async (req, res) => {
    const {name} = req.body;
    const result = await createAuthor(name);
    res.status(result.status).json(result);
};

const editAuthor = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const result = await updateAuthor(id, name);
    res.status(result.status).json(result);
};

const removeAuthor = async (req, res) => {
    const {id} = req.params;
    const result = await deleteAuthor(id);
    res.status(result.status).json(result);
};

module.exports = {
    getAuthors,
    getAuthor,
    addAuthor,
    editAuthor,
    removeAuthor,
};