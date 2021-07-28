const thing = require("../models/thing");

exports.createThing = (req, res, next) =>{
    (req, res, next) =>{ //Pour traîter la requête post
        delete req.body._id;//Retire le champs ID avant de la crétion de l'objet
        const thing = new Thing({
          ...req.body
        })
        thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    }
}
exports.modifyThing = (req, res, next) =>{
    //pour modifier un objet
        thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      }
      exports.deleteThing = (req, res, next) => {
        Thing.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      };
      
      exports.getAllSauces = (req, res, next) => {
        Thing.find().then(
          (things) => {
            res.status(200).json(things);
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      };
      exports.getOneSauce = (req, res, next) => {//récupération d'un Objet
        thing.findOne({ _id: req.params.id })// Methode findO nepour trouver un seul objet
          .then(thing => res.status(200).json(thing))//reponse
          .catch(error => res.status(404).json({ error }));//si erreur
      }
