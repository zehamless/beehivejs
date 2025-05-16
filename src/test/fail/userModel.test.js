const bcrypt = require('bcryptjs');
const User = require('../../model/userModel');

jest.mock('bcryptjs');

describe('User Model Save Error', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    
    it('should handle bcrypt hash errors', async () => {
        bcrypt.hash.mockImplementation(() => {
            throw new Error('Hash error');
        });

        const user = new User({
            name: 'Test User',
            email: 'errortest@example.com',
            password: 'password123'
        });

        await expect(user.save()).rejects.toThrow('Hash error');
    });

});