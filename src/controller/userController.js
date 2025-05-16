const AuthService = require("../service/authService");

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await AuthService.getUser(email, password);
        res.status(user.status).json({
            message: user.message,
            data: user.data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await AuthService.createUser(name, email, password);
        res.status(user.status).json({
            message: user.message,
            data: user.data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
module.exports = {
    login,
    register
};