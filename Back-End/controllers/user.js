const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

exports.signup = (req, res, next) => {
  //1e étape : hacher le mdp (1 : corps de la requête / 2 : nb tours pour créer mdp haché) :
  bcrypt
    .hash(req.body.password, 10)
    //Récupérer le mdp créé et en faire un User
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        //Sauvegarder ce User dans BDD
        .save()
        .then(() =>
          res.status(201).json({ message: "Compte créé avec succès !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          //Comparer le mdp écrit et celui de la BdD
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userId: user._id,
                //Appeler fonction sign de jsonwebtoken
                token: jwt.sign(
                  //Données à encoder dans le token
                  { userId: user._id },
                  //Clé secrète pour l'encodage
                  process.env.RANDOM_TOKEN_SECRET,
                  //Appliquer une expiration pour token
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
