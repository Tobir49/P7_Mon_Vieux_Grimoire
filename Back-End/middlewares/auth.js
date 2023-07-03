const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Utiliser try/catch s'il y a plusieurs erreurs
  try {
    //Récupérer le token
    const token = req.headers.authorization.split(" ")[1];
    //Décoder token et le vérifier avec jwt et la clé secrète
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
