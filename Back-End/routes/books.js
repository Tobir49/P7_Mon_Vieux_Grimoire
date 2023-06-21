const express = require("express");
const auth = require("../middlewares/auth");
const booksControllers = require("../controllers/books");
const router = express.Router();

router.post("/", auth, booksControllers.createBook);
router.put("/:id", auth, booksControllers.modifyBook);
router.delete("/:id", auth, booksControllers.deleteBook);
router.get("/:id", booksControllers.getOneBook);
router.get("/", booksControllers.getBooks);

module.exports = router;
