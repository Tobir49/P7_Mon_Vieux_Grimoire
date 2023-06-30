const express = require("express");
const auth = require("../middlewares/auth");
const booksControllers = require("../controllers/books");
const multer = require("../middlewares/multer-config");
const router = express.Router();

router.post("/", auth, multer, booksControllers.createBook);
router.post("/:id/rating", booksControllers.postRating);
router.put("/:id", auth, multer, booksControllers.modifyBook);
router.delete("/:id", auth, booksControllers.deleteBook);
//Placer .get /bestrating ici sinon aucun affichage
router.get("/bestrating", booksControllers.getBestRatings);
router.get("/:id", booksControllers.getOneBook);
router.get("/", booksControllers.getBooks);

module.exports = router;
