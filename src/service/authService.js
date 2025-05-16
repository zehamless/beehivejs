const User = require("../model/userModel");

const getUser = async (email, password) => {

    try {
        const user = await User.findOne({email: email}).exec();
        if (!user) {
            return {status: 404, message: 'User not found'};
        }
        if (!(await user.isValidPassword(password))) {
            return {status: 401, message: 'Invalid password'};
        }
        return {status: 200, data: user};
    } catch (error) {
        console.log(error)
        return {status: 500, message: 'Error fetching user'};
    }
};
const createUser = async (name, email, password) => {
    try {
        const existingUser = await User.findOne
        ({email: email}).exec();
        if (existingUser) {
            return {status: 409, message: 'User already exists'};

        }
        const newUser = new User({name, email, password});
        await newUser.save();
        return {status: 201, message: 'User created successfully', data: newUser};
    } catch (error) {
        console.log(error)
        return {status: 500, message: 'Error creating user'};
    }
}
const AuthService = {
    getUser,
    createUser
};

module.exports = AuthService;