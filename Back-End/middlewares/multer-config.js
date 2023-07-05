const multer = require("multer");
// const sharp = require("sharp");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//Créer un objet de configuration avec diskStorage (destination et filename)
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

//Redimensionner image (green code)
module.exports.resizeImages = (req, res, next) => {
  //Si aucune image -> ne pas exécuter la fonction
  if (!req.file) {
    return next();
  }

  //Chemin d'accès du fichier
  const filePath = req.file.path;
  //Nom du fichier
  const fileName = req.file.filename;
  //Joindre le répertoire 'images' avec le fichier redimensionner
  const resizedImage = path.join("images", `resized_${fileName}`);

  sharp(filePath)
    .resize({ width: 206, height: 260 })
    .toFile(resizedImage)
    .then(() => {
      //Utiliser le nouveau fichier à la place de celui d'origine
      fs.unlink(filePath, () => {
        req.file.path = resizedImage;
        next();
      });
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};
