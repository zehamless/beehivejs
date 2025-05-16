const {authenticateUser, createUser} = require("../service/authService");

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const data = await authenticateUser(email, password);
        res.status(data.status).json(data);
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
        const data = await createUser(name, email, password);
        res.status(data.status).json({
            message: data.message,
            data: data.data
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