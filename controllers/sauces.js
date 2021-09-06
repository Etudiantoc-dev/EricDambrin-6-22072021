const Thing = require("../models/sauce");
const fs = require("fs") //= fire System 

exports.createThing = (req, res, next) =>{
  const thingObject = JSON.parse(req.body.sauce);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
        thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
         // Erreur 404 ici!!
    };
    exports.getOneSauce = (req, res, next) => {//récupération d'un Objet
      thing.findOne({ _id: req.params.id })// Methode findO nepour trouver un seul objet
        .then(thing => res.status(200).json(thing))//reponse
        .catch(error => res.status(404).json({ error }));//si erreur
    }
         
    exports.getAllSauces = (req, res, next) => {
      thing.find().then(
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

exports.modifyThing = (req, res, next) =>{
    //pour modifier un objet
    const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
        thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
          
      }
      exports.deleteThing = (req, res, next) => {
        thing.findOne({ _id: req.params.id })
          .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Thing.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
          })
          .catch(error => res.status(500).json({ error }));
          
      };
 
      

