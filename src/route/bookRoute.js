const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    addBook,
    getBook,
    getBooks,
    editBook,
    removeBook
} = require("../controller/bookController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", addBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.put("/:id", editBook);
router.delete("/:id", removeBook);

module.exports = router;