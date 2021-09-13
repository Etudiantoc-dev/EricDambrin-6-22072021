const fs = require("fs"); //= fire System 
const Sauce = require("../models/sauce");
const User = require('../models/user');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject, //Spread = raccourci pour accéder au corp (shéma sauce ici) de la requète et évite de tout énumérer
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
  // Erreur 404 ou status 200 ici??
  //Est-ce que je dois mettre des next()??

};
exports.getOneSauce = (req, res, next) => {//récupération d'un Objet
  Sauce.findOne({ _id: req.params.id })// Methode findOne pour trouver un seul objet
    .then(sauce => res.status(200).json(sauce))//reponse
    .catch(error => res.status(404).json({ error }));//si erreur

}


exports.getAllSauces = (req, res, next) => {
  Sauce.find() // Pour récupérer toutes les sauces enregistrés dans la base de donné
    .then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error

        });
      }
    );
};

exports.modifySauce = (req, res, next) => {
  //pour modifier un objet
  const sauceObject = req.file ?  //Revoir ici le pourquoi de cette variable ternaire???
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })//Méthode pour modifier la sauce
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));

}
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));

};

exports.likeSauce = (req, res) => {// Appel des likes

  Sauce.findOne({ _id: req.params.id }) //Identification de la sauce à liker + Id correspondant
    .then(sauce => {
      if (req.body.like == 1) {
        sauce.likes++; // ajout du like
        sauce.usersLiked.push(req.body.userId); //ajout de l'utilisateur qui like
        sauce.save();//enregistrement dans la base de donnée
      }
      else { (req.body.like == -1) 
        sauce.dislikes++;
        sauce.usersDisliked.push(req.body.userId);
        sauce.save();
      }





      
      // if (req.body.like == 0) {
      //   sauce.likes--;
      //   sauce.usersLiked.splice(-1, req.body.userId, 0);//dernier élément du tableau, élément en question, suppression
      //   sauce.save()
      //   console.log(req.body.userId);




      // } if (req.body.like == 0) {
      //   sauce.dislikes--;
      //   sauce.usersDisliked.splice(-1, req.body.userId, 0);
      //   sauce.save()


      // }



      res.status(200).json({ message: 'avis annulé!' })
    }




    ).catch((error => res.status(500).json({ error }))




    );





  // .then(() => res.status(200).json({ message: 'Objet avisé !' }))
  // .catch(error => res.status(400).json({ error }));

}






