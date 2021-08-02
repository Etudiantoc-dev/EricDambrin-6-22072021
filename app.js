const express = require('express');
// const bodyParser = require('body-parser');// Pour gérer la demande post en important bodyParser ici
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express();


mongoose.connect('mongodb+srv://Eric:Dbmongoose@cluster0.1da6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {//Pour éviter l'erreur CORS = méthode de sécurité par défault //Configurer les bons headers sur l'objet réponse permet l'envoi et la réception de requètes et de réponses sans erreurs CORS
    res.setHeader('Access-Control-Allow-Origin', '*');//Accés à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Ajouter les Headers mentionnés aux requêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Pour rendre possible l'envoie des requêtes avec les méthodes mentionnées(get,post...)
    next();
  });
 
  // app.use(bodyParser.json());
  app.use(express.json());//définit la fonction json comme middleware global pour l'application
  
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/', (req, res, next) => {res.send('hello')});


module.exports = app;