const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    //Générer un nom de fichier unique
    const name = file.originalname.split(" ").join("_");
    //On a supprimé les epsaces dans les noms de fichiers pour les remplacer par des '_'
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
    //On rajouter le nom + la date + l'extension (pour le rendre unique)
  },
});

module.exports = multer({ storage }).single("image");
