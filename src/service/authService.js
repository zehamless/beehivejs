const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const {secret, expiresIn} = require("../config/jwt");

const getUser = async (email, password) => {
    try {
        const user = await User.findOne({email}).exec();
        if (!user) return {status: 404, message: 'User not found'};
        if (!(await user.isValidPassword(password))) return {status: 401, message: 'Invalid password'};
        const {password: _, ...userData} = user.toObject();
        return {status: 200, data: userData};
    } catch (error) {
        console.error(error);
        return {status: 500, message: 'Error fetching user'};
    }
};

const createUser = async (name, email, password) => {
    try {
        if (await User.findOne({email}).exec()) {
            return {status: 409, message: 'User already exists'};
        }
        const newUser = await new User({name, email, password}).save();
        const {password: _, ...userData} = newUser.toObject();
        return {status: 201, message: 'User created successfully', data: userData};
    } catch (error) {
        console.error(error);
        return {status: 500, message: 'Error creating user'};
    }
};

const authenticateUser = async (email, password) => {
    try {
        const data = await getUser(email, password);
        if (data.status !== 200) return data;
        const token = jwt.sign({id: data.data._id}, secret, {expiresIn: expiresIn});
        return {status: 200, message: 'User authenticated successfully', token};
    } catch (error) {
        console.error(error);
        return {status: 500, message: 'Error authenticating user'};
    }
};
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return {status: 200, data: decoded};
    } catch (error) {
        return {status: 401, message: 'Invalid token'};
    }
}
module.exports = {getUser, createUser, authenticateUser, verifyToken};