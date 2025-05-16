const mongoose = require('mongoose');
jest.mock('mongoose');

describe('Database Connection Error Handling', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {
    });

    beforeEach(() => {
        Object.defineProperty(mongoose, 'connection', {
            value: {close: jest.fn()},
            writable: true,
        });
    });

    afterEach(jest.clearAllMocks);

    it('connectDB should handle connection errors', async () => {
        mongoose.connect.mockRejectedValue(new Error('Connection failed'));
        const {connectDB} = require('../../config/db');
        await connectDB();
        expect(mockConsoleError).toHaveBeenCalledWith('MongoDB connection error:', expect.any(Error));
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('disconnectDB should handle disconnection errors', async () => {
        mongoose.connection.close.mockRejectedValue(new Error('Disconnection failed'));
        const {disconnectDB} = require('../../config/db');
        await disconnectDB();
        expect(mockConsoleError).toHaveBeenCalledWith('MongoDB disconnection error:', expect.any(Error));
        expect(mockExit).toHaveBeenCalledWith(1);
    });
});