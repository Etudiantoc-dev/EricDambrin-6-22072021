const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Eric:Dbmongoose@cluster0.1da6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const express = require('express');
const bodyParser = require('body-parser');// Pour gérer la demande post en important bodyParser ici
const thing = require('./models/thing');

const app = express();
app.use((req, res, next) => {//Pour éviter l'erreur CORS = méthode de sécurité par défault //Configurer les bons headers sur l'objet réponse permet l'envoi et la réception de requètes et de réponses sans erreurs CORS
    res.setHeader('Access-Control-Allow-Origin', '*');//Accés à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Ajouter les Headers mentionnés aux requêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Pour rendre possible l'envoie des requêtes avec les méthodes mentionnées(get,post...)
    next();
  });

  app.use(bodyParser.json());//définit la fontion json comme middleware global pour l'application



  app.post('/api/sauces',(req, res, next) =>{ //Pour traîter les requêtes de type post(et non .use car cela traîterait toutes les demandes)
    delete req.body._id;//Retire le champs ID avant de la crétion de l'objet
    const thing = new Thing({
      ...req.body
    })
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/sauces/:id', (req, res, next) => {//pour modifier un objet
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
app.delete('/api/sauces/:id', (req, res, next) => {//Pour la suppression d'un objet
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});
    
app.get('/api/sauces/:id', (req, res, next) => {//récupération d'un Objet
  Thing.findOne({ _id: req.params.id })// Methode findO nepour trouver un seul objet
    .then(thing => res.status(200).json(thing))//reponse
    .catch(error => res.status(404).json({ error }));//si erreur
});



app.get("/api/sauces", (req, res, next) =>{ //récupération des objets en ventes..
  Thing.find()
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({ error }));
   
});



module.exports = app;