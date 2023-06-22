const express = require("express");
const auth = require("../middlewares/auth");
const booksControllers = require("../controllers/books");
const multer = require("../middlewares/multer-config");
const router = express.Router();

router.post("/", auth, multer, booksControllers.createBook);
router.put("/:id", auth, multer, booksControllers.modifyBook);
router.delete("/:id", auth, booksControllers.deleteBook);
router.get("/:id", booksControllers.getOneBook);
router.get("/", booksControllers.getBooks);

module.exports = router;
