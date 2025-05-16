const User = require('../../model/userModel');
jest.mock('../../model/userModel');
const authService = require('../../service/authService');

describe('Auth Service Catch Block', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('getUser should handle errors', async () => {
        User.findOne.mockReturnValue({
            exec: jest.fn().mockRejectedValue(new Error('DB error'))
        });
        const result = await authService.getUser('test@gmail.com', 'password123');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error fetching user/i);
    });

    it('createUser should handle errors', async () => {
        User.findOne.mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        User.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error('DB error'))
        }));
        const result = await authService.createUser('Test User', 'test@gmail.com', 'password123');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error creating user/i);
    });
    it('authenticateUser should handle errors', async () => {
        const mockJwtSign = jest.spyOn(require('jsonwebtoken'), 'sign').mockImplementation(() => {
            throw new Error('JWT error');
        });

        User.findOne.mockReturnValue({
            exec: jest.fn().mockResolvedValue({
                _id: 'userid123',
                toObject: () => ({_id: 'userid123', email: 'test@gmail.com'}),
                isValidPassword: jest.fn().mockResolvedValue(true)
            })
        });

        const result = await authService.authenticateUser('test@gmail.com', 'password123');
        expect(result.status).toBe(500);
        expect(result.message).toMatch(/error authenticating user/i);

        mockJwtSign.mockRestore();
    });

});