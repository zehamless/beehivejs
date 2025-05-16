const {verifyToken} = require("../service/authService");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const token = authHeader.split(' ')[1];
    const result = verifyToken(token);
    if (result.status !== 200) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    req.user = result.data;
    next();
};

module.exports = authMiddleware;