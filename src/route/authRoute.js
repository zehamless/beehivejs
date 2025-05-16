const express = require("express");
const router = express.Router();
const {validateLogin, validateRegister} = require("../validation/validate");
const {login, register} = require("../controller/userController");

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register)

module.exports = router;