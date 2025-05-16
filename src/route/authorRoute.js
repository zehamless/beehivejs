const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    addAuthor,
    getAuthors,
    getAuthor,
    editAuthor,
    removeAuthor
} = require("../controller/authorController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", addAuthor);
router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.put("/:id", editAuthor);
router.delete("/:id", removeAuthor);

module.exports = router;