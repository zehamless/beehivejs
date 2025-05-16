const Author = require('../../model/authorModel');
jest.mock('../../model/authorModel');
const authorService = require('../../service/authorService');

describe('Author Service Catch Blocks', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('getAllAuthors should handle errors', async () => {
        Author.find.mockReturnValue({
            skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockRejectedValue(new Error('DB error'))
            })
        });
        Author.countDocuments.mockRejectedValue(new Error('DB error'));

        const result = await authorService.getAllAuthors();
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error fetching authors/i);
    });

    it('getAuthorById should handle errors', async () => {
        Author.findById.mockRejectedValue(new Error('DB error'));

        const result = await authorService.getAuthorById('fakeid');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error fetching author/i);
    });

    it('createAuthor should handle errors', async () => {
        Author.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error('DB error'))
        }));

        const result = await authorService.createAuthor('Test Author');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error creating author/i);
    });

    it('updateAuthor should handle errors', async () => {
        Author.findByIdAndUpdate.mockRejectedValue(new Error('DB error'));

        const result = await authorService.updateAuthor('fakeid', 'Updated Author');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error updating author/i);
    });

    it('deleteAuthor should handle errors', async () => {
        Author.findByIdAndDelete.mockRejectedValue(new Error('DB error'));

        const result = await authorService.deleteAuthor('fakeid');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error deleting author/i);
    });
});