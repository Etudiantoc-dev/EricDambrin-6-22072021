const bcrypt = require('bcrypt'); // package bcript installé
const jwt = require('jsonwebtoken');//permet à l'utilisateur de se connecter qu'une seule fois au compte

const User = require('../models/user');

exports.signup = (req, res, next) => { //Méthode s'inscrire //pour enregistrer les utilisateurs crypte le mot de passe avec lequel cré le nouveau utilisateur avec son adresse email
    console.log(req.body);
  bcrypt.hash(req.body.password, 10) //hash avec argument mot de passe et le nombre d'algorythme de hashage et  créé par bcrypt pour enregistrer le user dans la base de donné par la suite
      .then(hash => { // Asynchrone donc création des .then et .catch
        console.log(hash);
        const user = new User({ // ce qui est requis pour l'inscription d'un utilisateur
          email: req.body.email,
          password: hash //mot de passe crypté
        });
        console.log(user);
        user.save()// pour enregistrer dans la base de donnée
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => { // Permet aux utilisateur existant de se connecter(vérification des informations)
    User.findOne({ email: req.body.email })//Méthode FindOne pour trouver un seul utilisateur
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)//comparaison entre le mot de passe envoyé et le hash enregistré dans l'inscription
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  {userId : user._id },
                  'RANDOM_TOKEN_SECRET', // En production la chaîne serait de caractère plus complexe et longue évidemment!
                  { expiresIn : '24h'} // L'ajout du TOKEN permet de sécuriser que la création d'un objet ne soit pas modifiable par un autre utilisateur

              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
