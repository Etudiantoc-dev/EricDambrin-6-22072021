const fs = require("fs"); //= fire System 
const sauce = require("../models/sauce");

exports.createSauce = (req, res, next) =>{
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
        sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
         // Erreur 404 ou status 200 ici??
         //Est-ce que je dois mettre des next()??
        
    };
    exports.getOneSauce = (req, res, next) => {//récupération d'un Objet
      sauce.findOne({ _id: req.params.id })// Methode findOne pour trouver un seul objet
        .then(sauce => res.status(200).json(sauce))//reponse
        .catch(error => res.status(404).json({ error }));//si erreur
        
    }
    
         
    exports.getAllSauces = (req, res, next) => {
      sauce.find()
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

exports.modifySauce = (req, res, next) =>{
    //pour modifier un objet
     const sauceObject = req.file ? 
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
        sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
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
        sauce.findOne({ _id: req.params.id })
       
      }
    
      
      
 
      

              