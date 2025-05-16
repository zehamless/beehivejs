require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('MongoDB disconnection error:', error);
        process.exit(1);
    }
}
module.exports = {connectDB, disconnectDB};