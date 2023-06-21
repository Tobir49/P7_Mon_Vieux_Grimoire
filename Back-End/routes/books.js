const express = require("express");
const router = express.Router();
const booksControllers = require("../controllers/books");

router.post("/", booksControllers.createBook);
router.put("/:id", booksControllers.modifyBook);
router.delete("/:id", booksControllers.deleteBook);
router.get("/:id", booksControllers.getOneBook);
router.get("/", booksControllers.getBooks);

module.exports = router;
