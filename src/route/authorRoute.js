const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    addAuthor,
    getAuthors,
    getAuthor,
    editAuthor,
    removeAuthor
} = require("../controller/authorController");
const {validateCreateAuthor, validateUpdateAuthor} = require("../validation/validate");

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateCreateAuthor, addAuthor);
router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.put("/:id", validateUpdateAuthor, editAuthor);
router.delete("/:id", removeAuthor);

module.exports = router;