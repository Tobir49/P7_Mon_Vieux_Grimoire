const Book = require("../models/Book");
const fs = require("fs");
//fs permet d'interagir avec le système de fichiers du serveur

//Requête POST pour créer des livres
exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject.userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Requête PUT pour la page id
exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Requête DELETE pour supprimer un livre :
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//Requête GET pour acéder à un seul objet (:id)
exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

//Requête GET pour recevoir les livres
exports.getBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

//Requête POST pour noter un livre
exports.postRating = (req, res, next) => {
  //Constante qui prend la requête
  const ratingArray = req.body;
  //La requête = grade du tableau rating
  ratingArray.grade = ratingArray.rating;
  delete ratingArray.rating;

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        //Si le livre n'existe pas : page erreur
        res.status(404).json({ message: "Aucun livre" });
      } else {
        //Sinon ajouter la requête
        const ratingUser = book.ratings.includes(
          (rating) => rating.userId == req.body.userId
        );
        if (ratingUser) {
          //Si le user existe déjà, alors l'empêcher de noter un livre
          res
            .status(404)
            .json({ message: "Impossible de noter plusieurs fois un livre !" });
        } else {
          //Sinon mettre à jour le tableau rating
          Book.updateOne(
            { _id: req.params.id },
            { $push: { ratings: ratingArray } }
          )
            .then(() => {
              Book.findOne({ _id: req.params.id })
                .then((book) => {
                  const averageRatings = book.ratings.reduce(
                    (acc, rating) => acc + rating.grade,
                    0
                  );
                  //Calculer la moyenne
                  book.averageRating =
                    Math.round((averageRatings / book.ratings.length) * 10) /
                    10;

                  //Mettre à jour le chiffre dans la BdD
                  Book.updateOne(
                    { _id: req.params.id },
                    { averageRating: book.averageRating }
                  )
                    .then(() => {
                      Book.findOne({ _id: req.params.id })
                        .then((book) => {
                          res.status(200).json(book);
                        })
                        .catch((error) => res.status(404).json({ error }));
                    })
                    .catch((error) => res.status(401).json({ error }));
                })
                .catch((error) => res.status(404).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//Requête GET pour afficher les meilleures notes de livres
exports.getBestRatings = (req, res, next) => {};
