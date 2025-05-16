const express = require("express");
const router = express.Router();
const {validateLogin, validateRegister} = require("../validation/validate");
const {login, register} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);
router.get('/test', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Test route',
        user: req.user
    });
});

module.exports = router;