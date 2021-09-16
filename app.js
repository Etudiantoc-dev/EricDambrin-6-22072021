const express = require('express'); // Importation du framework Express
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express(); //Création de l'application express


mongoose.connect('mongodb+srv://Eric:hn9QMQhqkpxJBuiP@cluster0.8bgsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {//Pour éviter l'erreur CORS = méthode de sécurité par défaut (bloque les appels HTTP d'être effectués entre des serveurs différents) //Configurer les bons headers sur l'objet réponse permet l'envoi et la réception de requètes et de réponses sans erreurs CORS
  res.setHeader('Access-Control-Allow-Origin', '*');//Accés à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Ajouter les Headers mentionnés aux requêtes
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Pour rendre possible l'envoie des requêtes avec les méthodes mentionnées(get,post...)
  next();
});


app.use(express.json());//définit la fonction json comme middleware global pour l'application

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/', (req, res, next) => { res.send('hello') });


module.exports = app; //Exportation de l'application pour y accéder avec le server node ici



