const mongoose = require("mongoose");

//Création d'un schéma pour la base de données
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
});

//Exporter la fonction
module.exports = mongoose.model("Book", bookSchema);
