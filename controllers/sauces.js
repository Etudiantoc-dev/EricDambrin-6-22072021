const fs = require("fs"); //= fire System 
const sauce = require("../models/sauce");

exports.createSauce = (req, res, next) =>{
  const thingObject = JSON.parse(req.body.sauce);
  delete thingObject._id;
  const sauce = new Sauce({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
        sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
         // Erreur 404 ici!!
        
    };
    exports.getOneSauce = (req, res, next) => {//récupération d'un Objet
      sauce.findOne({ _id: req.params.id })// Methode findO nepour trouver un seul objet
        .then(sauce => res.status(200).json(sauce))//reponse
        .catch(error => res.status(404).json({ error }));//si erreur
    }
         
    exports.getAllSauces = (req, res, next) => {
      sauce.find().then(
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

exports.modifySauce = (req, res, next) =>{
    //pour modifier un objet
     thingObject = req.file ? // J'ai enlevé let = devant thingObject??
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
        sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
          
      }
      exports.deleteSauce = (req, res, next) => {
        sauce.findOne({ _id: req.params.id })
          .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
          })
          .catch(error => res.status(500).json({ error }));
          
      };
      exports.likeSauce = (req, res, next) =>{
        Sauce.findOne({ _id: sauceId })
      }
    
      
      
 
      

              