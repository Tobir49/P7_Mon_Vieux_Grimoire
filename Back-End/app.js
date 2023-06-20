const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");

//Se connecter à la base de donnée Atlas
mongoose
  .connect(
    "mongodb+srv://baptisteribot:PIQlCQMzm1Lg5COi@vieuxgrimoire.qhx7tbn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Création de constante
const app = express();
const data = "../Front-End/public/data/data.json";

//Méthodes .use :
app.use(express.json());

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Requête POST pour créer des livres
app.post("/api/books", (req, res, next) => {
  delete req.body.id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

//Requête GET pour recevoir les livres
app.get("/api/books", (req, res, next) => {
  const books = [
    // {
    //   imageUrl: data.imageUrl,
    //   title: data.title,
    //   genre: data.genre,
    //   year: data.year,
    //   author: data.author,
    // },
    {
      title: "Mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
    },
    {
      title: "Mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
    },
  ];
  res.status(200).json(books);
  // Book.find()
  //   .then((books) => res.status(200).json(books))
  //   .catch((error) => res.status(400).json({ error }));
});

//Exporter la fonction
module.exports = app;
