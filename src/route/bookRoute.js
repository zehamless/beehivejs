const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    addBook,
    getBook,
    getBooks,
    editBook,
    removeBook
} = require("../controller/bookController");
const {validateCreateBook, validateUpdateBook} = require("../validation/validate");

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateCreateBook, addBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.put("/:id", validateUpdateBook, editBook);
router.delete("/:id", removeBook);

module.exports = router;