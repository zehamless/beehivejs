const {authenticateUser, createUser} = require("../service/authService");

const login = async (req, res) => {
        const {email, password} = req.body;
        const data = await authenticateUser(email, password);
        res.status(data.status).json(data);
};
const register = async (req, res) => {
        const {name, email, password} = req.body;
        const data = await createUser(name, email, password);
        res.status(data.status).json({
            message: data.message,
            data: data.data
        });
}
module.exports = {
    login,
    register
};