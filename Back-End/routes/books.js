const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

//Requête POST pour créer des livres
router.post("/", (req, res, next) => {
  delete req.body.id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

//Requête PUT pour la page id
router.put("/:id", (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //{.., _id:req.params.id} permet de récupérer le bon id pour le modifier
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

//Requête DELETE pour supprimer un livre :
router.delete("/:id", (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

//Requête GET pour acéder à un seul objet (:id)
router.get("/:id", (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
});

//Requête GET pour recevoir les livres
router.get("/", (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
