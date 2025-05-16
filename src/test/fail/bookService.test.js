// src/test/bookService.catch.test.js
const Book = require('../../model/bookModel');
jest.mock('../../model/bookModel');
const bookService = require('../../service/bookService');

describe('Book Service Catch Blocks', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('getAllBooks should handle errors', async () => {
        Book.find.mockReturnValue({
            skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockReturnValue({
                    populate: jest.fn().mockRejectedValue(new Error('DB error'))
                })
            })
        });
        Book.countDocuments.mockRejectedValue(new Error('DB error'));

        const result = await bookService.getAllBooks();
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error fetching books/i);
    });

    it('getBookById should handle errors', async () => {
        Book.findById.mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('DB error'))
        });

        const result = await bookService.getBookById('fakeid');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error fetching book/i);
    });

    it('createBook should handle errors', async () => {
        Book.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error('DB error'))
        }));

        const result = await bookService.createBook({});
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error creating book/i);
    });

    it('updateBook should handle errors', async () => {
        Book.findByIdAndUpdate.mockRejectedValue(new Error('DB error'));

        const result = await bookService.updateBook('fakeid', {});
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error updating book/i);
    });

    it('deleteBook should handle errors', async () => {
        Book.findByIdAndDelete.mockRejectedValue(new Error('DB error'));

        const result = await bookService.deleteBook('fakeid');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error deleting book/i);
    });
});