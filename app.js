const express = require('express'); // = Série de fonctions Middleware() et Router pour la lisibilitée du code
const helmet = require("helmet");
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express(); //Création de l'application express
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({ // limite le nombre de requêtes vers un serveur(= meilleur expèrience utilisateur)
  windowMs: 15 * 60 * 1000,
  max: 100
});

mongoose.connect('mongodb+srv://Eric:hn9QMQhqkpxJBuiP@cluster0.8bgsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {//Pour éviter l'erreur CORS = méthode de sécurité par défaut (bloque les appels HTTP d'être effectués entre des serveurs différents) //Configurer les bons headers 
  res.setHeader('Access-Control-Allow-Origin', '*');//Accés à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Ajouter les Headers mentionnés aux requêtes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Pour rendre possible l'envoie des requêtes avec les méthodes mentionnées(get,post...)
  next();
});
// ICI l'app gère toutes les requêtes de l'application :
app.use(express.json());//définit le format json pour le middleware global pour l'application
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/', (req, res, next) => { res.send('hello') });
app.use(helmet()); // Sécurité (11 library internes de sécurités connues)
app.use(rateLimit());// Sécurité(limite le nombre de requête vers un server express)
app.use(limiter);

module.exports = app; //Exportation de l'application pour y accéder avec le server node ici




