const Author = require('../model/authorModel');

const getAllAuthors = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const [authors, total] = await Promise.all([
            Author.find().skip(skip).limit(limit),
            Author.countDocuments()
        ]);
        return {
            status: 200,
            data: authors,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        return {status: 500, message: 'Error fetching authors'};
    }
};

const getAuthorById = async (id) => {
    try {
        const author = await Author.findById(id);
        if (!author) return {status: 404, message: 'Author not found'};
        return {status: 200, data: author};
    } catch (error) {
        return {status: 500, message: 'Error fetching author'};
    }
};

const createAuthor = async (name) => {
    try {
        const author = new Author({name});
        await author.save();
        return {status: 201, data: author};
    } catch (error) {
        return {status: 500, message: 'Error creating author'};
    }
};

const updateAuthor = async (id, name) => {
    try {
        const author = await Author.findByIdAndUpdate(id, {name}, {new: true});
        if (!author) return {status: 404, message: 'Author not found'};
        return {status: 200, data: author};
    } catch (error) {
        return {status: 500, message: 'Error updating author'};
    }
};

const deleteAuthor = async (id) => {
    try {
        const author = await Author.findByIdAndDelete(id);
        if (!author) return {status: 404, message: 'Author not found'};
        return {status: 200, message: 'Author deleted successfully'};
    } catch (error) {
        return {status: 500, message: 'Error deleting author'};
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};