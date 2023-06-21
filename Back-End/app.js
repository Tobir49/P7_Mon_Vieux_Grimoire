const express = require("express");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");

//Se connecter à la base de donnée Atlas
mongoose
  .connect(
    "mongodb+srv://baptisteribot:PIQlCQMzm1Lg5COi@vieuxgrimoire.qhx7tbn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
// app.use(express.json());

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

//Routers (user / books) importés depuis books.js
app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
